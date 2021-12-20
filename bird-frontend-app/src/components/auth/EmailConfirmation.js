import React from 'react'
import { Spin, Icon } from 'antd'

import { auth } from 'api'

import { openNotification } from 'utils/basic'
import { AuthController } from './components'
import css from './styles.less'

const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />

export default class EmailConfirmation extends AuthController {
  state = {
    loading: true,
    error: false,
  }

  componentDidMount () {
    const { history } = this.props
    const params = new URLSearchParams(history.location.search)

    auth.emailConfirm({
      code: params.get('token'),
    }).then(() => {
      this.setState({
        loading: false,
      })
    }).catch(err => {
      this.setState({
        loading: false,
        error: true,
      })

      openNotification('error', {
        message: 'Error',
        description: (err?.response?.data?.error || err).toString(),
      })
    })
  }

  renderContent () {
    const { loading, error } = this.state

    return (
      <div className={css.containerForm}>
        <div className={css.containerFormLeft}>
          <div className={css.containerFormRightLogo}>
            <img alt='Right logo' src='/img/logo.jpg' />
          </div>

          <h1 className={[css.text, css.titleText].join(' ')}>Email Confirmation</h1>

          {loading ? (
            <div>
              <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                We are confirming your account...  <Spin indicator={antIcon} className={css.spinnerStyle} />
              </div>
            </div>
          ) : (
            <div>
              {error ? (
                <div>
                  <div className={css.emailSentContainer}>
                    <img alt='Right logo' src='/img/error.png' className={css.errorImage} />
                  </div>

                  <div className={[css.subTitleText, css.centeredText, css.marginBottom40].join(' ')}>
                      An error has occurred.
                  </div>
                </div>
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
