import React from 'react'
import { Button } from 'antd'
import c from 'classnames'
import css from './index.less'

const CustomButton = ({ text = '', type = '', onClick = () => {}, loading = false }) => {
  return (
    <Button
      className={c(css.wrapperButton, { [css.black]: type === 'black', [css.white]: type === 'white' })}
      onClick={onClick}
      loading={loading}
    >
      {text}
    </Button>
  )
}

export default CustomButton
