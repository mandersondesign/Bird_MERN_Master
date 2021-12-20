import React from 'react'
import { EcoFormInput } from 'components'

const InputNum = ({ validator, name = '' }) => (
  <EcoFormInput
    options={{
      rules: [{ validator }],
      initialValue: '',
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    }}
    placeholder=''
    label=''
    autoComplete='off'
    prefix={false}
    size='default'
    name={name}
  />
)

export default InputNum
