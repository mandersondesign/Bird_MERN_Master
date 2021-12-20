import React from 'react'
import T from 'prop-types'
import css from '../styles.less'

function ResetPasswordWrapper ({ children }) {
  return (
    <div className={css.containerForm}>
      <h1 className={css.text}>Reset Password</h1>
      {children}
    </div>
  )
}

ResetPasswordWrapper.propTypes = {
  children: T.node.isRequired,
}

export default ResetPasswordWrapper
