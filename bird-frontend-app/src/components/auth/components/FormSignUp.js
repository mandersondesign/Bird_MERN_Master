import React from 'react'

import { EcoForm, EcoFormInput, NavLink } from 'components'
import { Button } from 'components/CustomButton'
import css from '../styles.less'
import { prepareRegistrationInputs } from '../utils'
import cn from 'classnames'

const FormSignUp = ({ signUp, submitSignUp, loading }) => {
  const renderInput = (props, i) => <EcoFormInput key={i} {...props} />

  return (
    <EcoForm className={css.form} onSubmit={submitSignUp}>
      {prepareRegistrationInputs.map(renderInput)}

      <Button
        loading={loading}
        size={Button.SIZE_LARGE}
        face={Button.FACE_PRIMARY}
        key='submit'
        htmlType='submit'
        className={css.signFormMargin}
      >
        GET STARTED
      </Button>

      <div className={cn(css.text)}>
        Already have an account?{' '}
        <div className={cn(css.signUp)}>
          <NavLink to='/login' onClick={signUp}>
            Login
          </NavLink>
        </div>

      </div>
    </EcoForm>
  )
}

export default FormSignUp
