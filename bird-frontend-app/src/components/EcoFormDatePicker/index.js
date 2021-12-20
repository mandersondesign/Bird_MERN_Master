import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Form } from '..'

const dateFormat = ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD', 'YY-MM-DD', 'YY/MM/DD', 'YYMMDD']

export default function EcoFormDatePicker (parentProps, context) {
  const { name, label, options, type, className, ...props } = parentProps
  const { form } = context
  const { getFieldDecorator } = form

  return (
    <Form.Item className={className} label={label}>
      {getFieldDecorator(name, options)(<DatePicker format={dateFormat} {...props} />)}
    </Form.Item>
  )
}

EcoFormDatePicker.defaultProps = {
  options: {},
  label: '',
}

EcoFormDatePicker.contextTypes = {
  form: PropTypes.object,
  dateFormat: PropTypes.array,
}
