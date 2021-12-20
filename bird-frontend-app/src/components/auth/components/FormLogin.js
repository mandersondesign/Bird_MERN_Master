import React from 'react'

import { EcoForm, EcoFormInput, NavLink } from 'components'
import { Button } from 'components/CustomButton'
import css from '../styles.less'
import { prepareLoginInputs } from '../utils'
import cn from 'classnames'
import config from 'config'

const FormLogin = ({ login, loading, signUp }) => {
  const renderInput = (props, i) => <EcoFormInput key={i} {...props} />
  return (
    <EcoForm className={css.form} onSubmit={login}>
      {prepareLoginInputs.map(renderInput)}
      <div className={cn(css.forgotPassword)}>
        <NavLink to='/reset-password'>
          Forgot your password?
        </NavLink>
      </div>

      <Button
        loading={loading}
        size={Button.SIZE_LARGE}
        face={Button.FACE_PRIMARY}
        key='submit'
        htmlType='submit'
        className={css.formMargin}
      >
        SIGN IN
      </Button>

      {config.showSignUp === true && (
        <div className={cn(css.containerSignUp)}>
          <span className={cn(css.text)}>Don't have an account?</span>
          <span className={cn(css.signUp)}>
            <NavLink to='/signUp' onClick={signUp}>
              Sign up
            </NavLink>
          </span>
        </div>
      )}
    </EcoForm>
  )
}

export default FormLogin
