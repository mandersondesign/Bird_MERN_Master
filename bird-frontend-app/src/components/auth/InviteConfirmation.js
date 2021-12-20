import React from 'react'
import { Spin, Icon, Button } from 'antd'

import { auth } from 'api'

import { openNotification } from 'utils/basic'
import { prepareSetPasswordInputs } from 'components/auth/utils'
import { EcoForm } from 'components/index'
import { AuthController } from './components'
import css from './styles.less'

const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />

export default class EmailConfirmation extends AuthController {
  state = {
    loading: false,
    passswordWasSet: false,
    confirmDirty: false,
  }

  // componentDidMount() {
  //   const { history } = this.props
  //   const params = new URLSearchParams(history.location.search)

  //   auth.resetPasswordCheckToken({
  //     key: params.get('token')
  //   }).then(() => {
  //     this.setState({
  //       loading: false
  //     });
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
        await auth.requestResetPassword({ ...e.fields, key: params.get('token') })
        this.setState({
          loading: false,
          passswordWasSet: true,
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
    const { loading, passswordWasSet } = this.state

    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <img alt='Right logo' src='/img/logo.jpg' />
          </div>

          <h1 className={[css.text, css.titleText].join(' ')}>Invite Confirmation</h1>

          {loading ? (
            <div>
              <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                We are updating your account...  <Spin indicator={antIcon} className={css.spinnerStyle} />
              </div>
            </div>
          ) : (
            <div>
              {!passswordWasSet ? (
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
              ) : (
                <div>
                  <div className={css.emailSentContainer}>
                    <img alt='Right logo' src='/img/success.svg' />
                  </div>

                  <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                      Your account was successfully confirmed.
                  </div>
                </div>
              )}
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

EmailConfirmation.propTypes = {
  ...AuthController.propTypes,
}

EmailConfirmation.defaultProps = {}
