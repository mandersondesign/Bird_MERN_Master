import React from 'react'
import { useLocation } from 'react-router-dom'
import css from './index.less'

import logo from './logo.png'
import Connection from './Connection.svg'
import stravaLogo from './stravaLogo.png'

const StravaConnection = () => {
  const { pathname } = useLocation()

  const page = pathname.split('/')[1]

  const objPage = {
    success: {
      title: 'Connected!',
      desc: 'Please close this page and return to the Bird app to continue.',
    },
    error: {
      title: 'Connection cancelled!',
      desc: 'Please close this page and return to the Bird app to continue.',
    },
    unsucessful: {
      title: 'Connection failed!',
      desc: 'Please try again later.',
    },
  }

  const content = objPage[page]

  return (
    <div className={css.wrapper}>
      <div className={css.row}>
        <img src={logo} alt='logo' className={css.sizeImg} />
        <div className={css.connectionImg}>
          <Connection />
        </div>
        <img src={stravaLogo} alt='stravaLogo' className={css.sizeImg} />
      </div>

      <h1 className={css.title}>{content?.title}</h1>

      <p className={css.description}>{content?.desc}</p>
    </div>
  )
}

export default StravaConnection
