import React from 'react'
import { connect } from 'react-redux'
import { openNotification, throttledAction } from 'utils/basic'
import AuthController from './components/AuthController'
import FormLogin from './components/FormLogin'
import FormSignUp from './components/FormSignUp'
import SignUpVerification from './components/SignUpVerification'
import { getCurrentUser, getMeasurement } from 'modules/session/session-actions'
import { sessionSelector } from 'modules/session/session-selectors'
import css from './styles.less'
import { auth } from 'api/index'
import { isAdmin, getFirstLoadUrl } from 'utils'
import { push, history } from 'modules/router'
import _ from 'lodash'
import { BIRD_MARKETING_WEBSITE } from 'utils/constants'

const PLATFORM = 'web'

class LoginContainer extends AuthController {
  state = {
    loading: false,
    email: [],
    isSignUp: false,
  }

  componentDidMount () {
    this.handleSignUp()
  }

  handleSignUp = () => {
    this.setState({ isSignUp: window.location.pathname.includes('signUp') })
  }

  onSignUpSubmit = throttledAction(e => {
    if (!e.errors) {
      this.setState({ loading: true })
      const phone = e.fields.phone.toString()
      const firstName = e.fields.firstName.trim()
      const lastName = e.fields.lastName.trim()
      const email = e.fields.email.trim()
      if (_.includes(e.fields.phone, '_') || phone.length < 11) {
        e.onFailure({
          errors: {
            phone: {
              phone: 'Phone contain wrong format',
            },
          },
        })

        this.setState({ loading: false })
        return false
      }

      const data = { phone: phone, firstName: firstName, lastName: lastName, email: email, password: e.fields.password, userTypeId: 2, isActive: true }

      const request = auth.registration(data)
      request
        .then(res => {
          if (res.data.message === 'OK') {
            this.props.getCurrentUser(res.data.token).then(() => {
              if (!isAdmin(res?.data?.user)) {
                history.replace('/logout', {})
              }
              push(isAdmin(res?.data?.user) ? '/users' : '/steps/1')
            })
          }
        })
        .catch(err => {
          openNotification('error', {
            message: 'Error',
            description: (err?.response?.data?.error || err).toString(),
          })
        })

      this.setState({ loading: false })
    }
  })

  handleSubmitLogin = async e => {
    if (!e.errors) {
      this.setState({ loading: true })
      try {
        const res = await this.props.login({ ...e.fields, platform: PLATFORM })
        this.props.getMeasurement()
        push(getFirstLoadUrl(res?.user))
      } catch (err) {
        this.setState({ loading: false })

        openNotification('error', {
          message: 'Error',
          description: (err?.response?.data?.error || err).toString(),
        })
      }
    }
  }

  renderContent () {
    const { isSignUp } = this.state
    const url = window.location.pathname.split('/')[1]
    const loginPage = {
      login: () => (
        <FormLogin
          login={this.handleSubmitLogin}
          loading={this.state.loading}
          signUp={this.handleSignUp}
        />
      ),
      signUp: () => (
        <FormSignUp
          signUp={this.handleSignUp}
          submitSignUp={this.onSignUpSubmit}
          loading={this.state.loading}
        />
      ),
      signUpVerification: () => <SignUpVerification />,
    }
    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <a href={BIRD_MARKETING_WEBSITE}>
              <img alt='Right logo' src='/img/logo.jpg' />
            </a>
          </div>
          <h1 className={css.titleText}>
            {isSignUp ? 'Create your coach account' : 'Coach Log in'}
          </h1>
          {loginPage[url] ? loginPage[url]() : loginPage.login()}
        </div>
        <div className={css.containerFormRight}>
          <img
            alt='Right logo'
            src='/img/main-image.jpg'
            className={css.rightImage}
          />
        </div>
      </div>
    )
  }

  render () {
    return super.render(this.renderContent)
  }
}

LoginContainer.propTypes = {
  ...AuthController.propTypes,
}

LoginContainer.defaultProps = {}

const mapStateToProps = state => ({
  session: sessionSelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  getCurrentUser: token => dispatch(getCurrentUser(token)),
  getMeasurement: () => dispatch(getMeasurement()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
