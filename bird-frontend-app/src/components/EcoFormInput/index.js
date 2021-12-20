import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from '..'

// import type { FormPropTypes } from '../EcoForm';

// export type FormInputPropTypes = {
//   name: string,
//   label?: string,
//   options?: Object,
// };
//
// export type FormInputContextTypes = {
//   form: FormPropTypes,
// };

export default function FormInput(parentProps, context) {
  const { name, label, options, type, refFocus, className, ...props } = parentProps
  const { form } = context
  const { getFieldDecorator } = form

  return (
    <Form.Item className={className} label={label}>
      {getFieldDecorator(name, options)(type === 'password' ? <Input.Password {...props} /> : <Input ref={refFocus} {...props} />)}
    </Form.Item>
  )
}

FormInput.defaultProps = {
  options: {},
  label: '',
}

FormInput.contextTypes = {
  form: PropTypes.object,
}
