import React from 'react'
import { NavLink } from 'components'
import css from '../styles.less'
import cn from 'classnames'

const SignUpVerification = () => {
  return (
    <div className={[css.text, css.titleText].join(' ')}>
      <div className={css.emailSentContainer}>
        <img alt='Verification mail' src='/img/email-sent.svg' />
      </div>
      <div className={cn(css.text, css.title, css.emailSentContainer, css.VerificationMessage)}>
        <p>
          We've just sent you an email with a verification<br />link. Please check it and follow instructions.
        </p>
      </div>
      <div className={cn(css.text, css.title, css.forgotPassword, css.VerificationLink)}>
        <NavLink to='/login'>
          Back to Log in page
        </NavLink>
      </div>
    </div>
  )
}

export default SignUpVerification
