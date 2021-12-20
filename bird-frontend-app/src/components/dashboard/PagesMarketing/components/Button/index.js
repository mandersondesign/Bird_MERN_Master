import React from 'react'
import { Button as ButtonAntd } from 'antd'
import c from 'classnames'
import css from './index.less'

const Button = ({ title, customClass, disabled, loading, ...props }) => (
  <ButtonAntd
    disabled={disabled}
    loading={loading}
    className={c(css.button, customClass, { [css.disabledBtn]: disabled })}
    {...props}
  >
    {title}
  </ButtonAntd>
)

export default Button
