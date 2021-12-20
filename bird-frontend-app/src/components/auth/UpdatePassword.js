import React from 'react'

import { EcoForm, NavLink } from 'components'
import { Button } from 'antd'
import { auth } from 'api/index'
import { openNotification } from 'utils/basic'
import cn from 'classnames'
import css from './styles.less'
import { prepareSetPasswordInputs } from './utils'
import { AuthController } from './components'

const COACH_USER_TYPE_ID = 2

export default class UpdatePassword extends AuthController {
  state = {
    loading: false,
    passwordWasChanged: false,
    confirmDirty: false,
    hideBackLinkToLogin: true,
  }

  // componentDidMount() {
  //   const { history } = this.props
  //   const params = new URLSearchParams(history.location.search)

  //   auth.resetPasswordCheckToken({
  //     key: params.get('token')
  //   }).then((message) => {
  //     if(message === 'Wrong token' || message === 'Password reset link is expired'){
  //       history.replace('login');
  //     }
  //   });
  // }

  handleSubmit = async e => {
    if (!e.errors) {
      const { history } = this.props
      const params = new URLSearchParams(history.location.search)

      this.setState({
        loading: true,
      })

      try {
        await auth.changePassword({ ...e.fields, key: params.get('token') })
          .then(r => {
            if (r.data.userTypeId === COACH_USER_TYPE_ID) {
              this.setState({
                hideBackLinkToLogin: false,
              })
            }
          })
        this.setState({
          loading: false,
          passwordWasChanged: true,
        })
      } catch (err) {
        this.setState({
          loading: false,
          hideBackLinkToLogin: true,
        })

        openNotification('error', {
          message: 'Error',
          description: (err?.response?.data?.error || err).toString(),
        })
      }
    }
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState(prev => ({ confirmDirty: prev.confirmDirty || !!value }))
  };

  onComparePasswords = (rule, value, callback) => {
    if (rule.field === 'confirm_password') {
      if (value && value !== this.formRef.props.form.getFieldValue('password')) {
        callback('Passwords do not match.')
      } else {
        callback()
      }
    } else if (rule.field === 'password') {
      if (value && this.state.confirmDirty) {
        this.formRef.props.form.validateFields(['confirm_password'], () => {})
      }
      callback()
    }
  }

  renderContent () {
    const { loading, passwordWasChanged, hideBackLinkToLogin } = this.state

    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <img alt='Right logo' src='/img/logo.jpg' />
          </div>

          <h1 className={[css.text, css.titleText].join(' ')}>Create password</h1>

          {!passwordWasChanged ? (
            <div>
              <EcoForm
                className={css.form}
                wrappedComponentRef={inst => { this.formRef = inst }}
                onSubmit={this.handleSubmit}
              >
                {prepareSetPasswordInputs({
                  onBlur: this.handleConfirmBlur,
                  onComparePasswords: this.onComparePasswords,
                }).map(this.renderInput)}
                <Button
                  loading={loading} className={[css.button, css.submitButton].join(' ')} key='submit'
                  htmlType='submit'
                >CREATE PASSWORD
                </Button>
              </EcoForm>
            </div>
          ) : (
            <div>
              <div className={css.emailSentContainer}>
                <img alt='Right logo' src='/img/success.svg' />
              </div>

              <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                Your password was successfully changed.

                {hideBackLinkToLogin && (
                  <div>
                     Please open your Bird mobile app and login
                  </div>
                )}
              </div>
            </div>
          )}

          {!hideBackLinkToLogin && (
            <div className={cn(css.text, css.title, css.forgotPassword)}>
              <NavLink to='/login'>Back to Coach Log in page</NavLink>
            </div>
          )}
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

UpdatePassword.propTypes = {
  ...AuthController.propTypes,
}

UpdatePassword.defaultProps = {}
