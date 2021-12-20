import React from 'react'

import { EcoForm, NavLink } from 'components'
import { Button } from 'antd'
import { auth } from 'api/index'
import { openNotification } from 'utils/basic'
import cn from 'classnames'
import css from './styles.less'
import { prepareResetInputs } from './utils'
import { AuthController } from './components'
import { BIRD_MARKETING_WEBSITE } from 'utils/constants'

export default class ResetPasswordRequest extends AuthController {
  state = {
    loading: false,
    emailSent: false,
    emailAddress: '',
  }

  handleSubmit = async e => {
    if (!e.errors) {
      this.setState({
        loading: true,
      })

      try {
        await auth.requestResetPassword(e.fields)
        this.setState({
          loading: false,
          emailSent: true,
          emailAddress: e.fields.email,
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

  renderContent() {
    const { loading, emailSent, emailAddress } = this.state

    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <a href={BIRD_MARKETING_WEBSITE}>
              <img alt='Right logo' src='/img/logo.jpg' />
            </a>
          </div>

          <h1 className={[css.text, css.titleText].join(' ')}>Reset password</h1>

          {!emailSent ? (
            <div>
              <div className={css.subTitleText}>To reset password please enter the email address that was used during
              Bird onboarding
              </div>

              <EcoForm
                className={css.form}
                onSubmit={this.handleSubmit}
              >
                {prepareResetInputs.map(this.renderInput)}
                <Button
                  loading={loading} className={[css.button, css.submitButton].join(' ')} key='submit'
                  htmlType='submit'
                >RESET
                </Button>
              </EcoForm>
            </div>
          ) : (
              <div>
                <div className={css.emailSentContainer}>
                  <img alt='Right logo' src='/img/email-sent.svg' />
                </div>

                <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                  Email with password reset instructions was sent to {emailAddress}
                </div>
              </div>
            )}

          <div className={cn(css.text, css.title, css.forgotPassword)}>
            <NavLink to='/login'>Back to Coach Log in page</NavLink>
          </div>
        </div>
        <div className={css.containerFormRight}>
          <img alt='Right logo' src='/img/main-image.jpg' className={css.rightImage} />
        </div>
      </div>
    )
  }

  render() {
    return super.render(this.renderContent)
  }
}

ResetPasswordRequest.propTypes = {
  ...AuthController.propTypes,
}

ResetPasswordRequest.defaultProps = {}
