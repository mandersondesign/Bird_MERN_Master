import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { notification } from 'antd'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import config from 'config'
import logo from '../../../../../static/img/logo.jpg'
import CloseImg from '../images/close.svg'
import HappyImg from '../images/happy.svg'
import AppStoreImg from '../images/btnAppStore.png'
import PlayMarketImg from '../images/btnPlayMarket.png'
import FacebookImg from '../images/Facebook.svg'
import InstagramImg from '../images/Instagram.svg'
import TwitterImg from '../images/Twitter.svg'
import Mail from '../images/mail.svg'
import Circle from '../images/circle.svg'
import css from './index.less'

const urlAppStore = 'https://apps.apple.com/us/app/bird-coach/id1499797296?ls=1'
const urlGooglePlay = 'https://play.google.com/store/apps/details?id=coach.bird.app'
const urlMarketing = config.urlMarketing
const urlInstagram = 'https://www.instagram.com/bird_coach/'

const Confirmation = () => {
  const { alias } = useParams()
  const { search } = useLocation()

  const isSubscription = search?.split('&')?.[0]?.includes('subscription')

  const onClose = () => {
    window.location = urlMarketing
  }

  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = urlMarketing
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    notification.success({ message: 'Copied!' })
  }

  const goToInstagram = () => {
    window.open(urlInstagram, '_blank')
  }

  return (
    <div className={css.container}>
      <img src={logo} alt='logo' className={css.logo} onClick={onClose} />

      <div className={css.wrapper}>
        <div className={css.imgClose}>
          <CloseImg className={css.img} onClick={onClose} />
        </div>

        <HappyImg className={css.imgHappy} />

        <div className={css.title}>Thanks for joining the team!</div>
        <div className={[css.firstDesc, css.desc].join(' ')}>
          Check your email for next steps!
        </div>
        <div className={[css.secondDesc, css.desc].join(' ')}>
          Download the Bird app, sign up in the app with your email.
        </div>

        <div className={css.socialLinks}>
          <a href={urlAppStore} target='blank'>
            <img src={AppStoreImg} alt='app store' className={css.icon} />
          </a>
          <a href={urlGooglePlay} target='blank'>
            <img src={PlayMarketImg} alt='play market' className={[css.icon, css.iconMarket].join(' ')} />
          </a>
        </div>

        <div className={css.socialIcons}>
          <div className={css.mainTitle}>Running is better with friends!</div>
          <div className={css.subTitle}>Send this invite link to a friend right now</div>

          <div className={css.icons}>
            <Circle className={css.icon} onClick={copyToClipboard} />
            <a href='mailto:hello@bird.coach' className={css.iconEmail}>
              <Mail className={css.icon} />
            </a>
            <InstagramImg className={css.icon} onClick={goToInstagram} />
            <TwitterShareButton url={urlMarketing} className={css.iconEmail}>
              <TwitterImg className={css.icon} />
            </TwitterShareButton>
            <FacebookShareButton url={urlMarketing} className={css.iconEmail}>
              <FacebookImg className={css.icon} />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
