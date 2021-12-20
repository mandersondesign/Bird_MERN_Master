import React from 'react'
import cn from 'classnames'
import { NavLink, EcoForm } from 'components'
import { auth } from 'api'
import { openNotification } from 'utils/basic'
import { Button } from 'antd'
import { AuthController } from './components'
import { prepareRegistrationInputs } from './utils'
import css from './styles.less'

export default class RegistrationContainer extends AuthController {
  state = {
    loading: false,
  }

  handleSubmit = async e => {
    if (!e.errors) {
      this.setState({
        loading: true,
      })

      try {
        await auth.registration(e.fields)
        this.setState({
          loading: false,
        })

        openNotification('success', {
          message: 'Success',
          description: 'You successfully created an account!',
        })
      } catch (err) {
        this.setState({
          loading: false,
        })

        openNotification('error', {
          message: 'Error',
          description: (err?.response?.data?.error || err).toString(),
        })
      }
    }
  }

  renderContent () {
    const { loading } = this.state

    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <img alt='Right logo' src='/img/logo.jpg' />
          </div>

          <h1 className={[css.text, css.titleText].join(' ')}>Registration</h1>
          <EcoForm
            className={css.form}
            onSubmit={this.handleSubmit}
          >
            {prepareRegistrationInputs.map(this.renderInput)}
            <Button
              loading={loading} className={[css.button, css.submitButton].join(' ')} key='submit'
              htmlType='submit'
            >SIGN UP
            </Button>

            <div className={cn(css.text, css.title, css.forgotPassword)}>
              <NavLink to='/login'>Do you have your own account?</NavLink>
            </div>
          </EcoForm>
        </div>
        <div className={css.containerFormRight}>
          <img alt='Right logo' src='/img/main-image.jpg' className={css.rightImage} />
        </div>
      </div>
    )
  }

  render () {
    return super.render(this.renderContent)
  }
}

RegistrationContainer.propTypes = {
  ...AuthController.propTypes,
}

RegistrationContainer.defaultProps = {}
