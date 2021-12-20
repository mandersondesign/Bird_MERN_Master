import React from 'react'
import css from './index.less'

const Confirmation = () => {
  return (
    <div className={css.wrapperConfirmation}>
      <div className={css.confirmationBlock}>
        <img src='/img/confirmation-message.svg' alt='confirmatin-logo' className={css.logo} />
        <div className={css.messageTitle}>Thank you for your registration</div>
        <div className={css.messageDescription}>We have sent your registration details to your email address.</div>
        <div className={css.stores}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://apps.apple.com/us/app/bird-coach/id1499797296?ls=1'
            className={css.link}
          >
            <img src='/img/app_store_badge.svg' alt='apple store' className={css.shops} />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://play.google.com/store/apps/details?id=coach.bird.app'
            className={css.link}
          >
            <img src='/img/google-play-badge.svg' alt='google store' width='130px' className={css.shops} />
          </a>
        </div>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://bird.coach/'
          className={css.link}
        >
          <img src='/img/logo_bird.svg' alt='logo bird' className={css.birdLogo} />
        </a>
      </div>
    </div>)
}

export default Confirmation
