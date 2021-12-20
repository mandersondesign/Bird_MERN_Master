import React from 'react'

import { EcoForm } from 'components'
import { Button, Icon } from 'antd'
import { auth } from 'api/index'
import { openNotification } from 'utils/basic'
import { AuthController } from './components'
import { prepareInvitePasswordInputs } from './utils'
import css from './styles.less'

export default class InvitePassword extends AuthController {
  state = {
    loading: false,
    passwordWasCreated: false,
  }

  handleSubmit = async e => {
    if (!e.errors) {
      const { history } = this.props
      const params = new URLSearchParams(history.location.search)

      this.setState({
        loading: true,
      })

      try {
        await auth.inviteConfirm({ code: params.get('token'), password: e.fields.password })
          .then(() => {
            this.setState({
              loading: false,
              passwordWasCreated: true,
            })
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

  onComparePasswords = (rule, value, callback) => {
    const res = value && value !== this.formRef.props.form.getFieldValue('password')
      ? 'Passwords do not match.'
      : undefined
    callback(res)
  }

  renderContent () {
    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <img alt='Right logo' src='/img/logo.jpg' />
          </div>

          <h1 className={[css.text, css.titleText].join(' ')}>Create password</h1>

          {this.state.passwordWasCreated
            ? (
              <div>
                <div className={css.emailSentContainer}>
                  <img alt='Right logo' src='/img/success.svg' />
                </div>
                <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                  Your password was successfully created. Your account is confirmed now. Please download Bird app and login.
                </div>
                <div className={css.containerBadges}>
                  <span className={css.wrapperBadge}>
                    <a href='https://apps.apple.com/us/app/bird-coach/id1499797296?ls=1' target='blank'>
                      <img className={css.logoBadge} alt='Store badge' src='/img/app_store_badge.svg' />
                    </a>
                  </span>
                  <span className={css.wrapperBadge}>
                    <a href='https://play.google.com/store/apps/details?id=coach.bird.app' target='blank'>
                      <img className={css.logoBadge} alt='Market badge' src='/img/google-play-badge.svg' />
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <EcoForm
                  className={css.form}
                  wrappedComponentRef={inst => { this.formRef = inst }}
                  onSubmit={this.handleSubmit}
                >
                  {prepareInvitePasswordInputs({
                    onComparePasswords: this.onComparePasswords,
                  }).map(this.renderInput)}
                  <Button
                    loading={this.state.loading} className={[css.button, css.submitButton].join(' ')} key='submit'
                    htmlType='submit'
                  >
                  CREATE PASSWORD
                    <Icon className={css.arrowIcon} type='arrow-right' />
                  </Button>
                </EcoForm>
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

InvitePassword.propTypes = {
  ...AuthController.propTypes,
}

InvitePassword.defaultProps = {}
