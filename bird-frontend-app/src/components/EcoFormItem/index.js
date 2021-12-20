import React from 'react'
import { Form } from '..'

// import type { FormPropTypes } from '../EcoForm';

export default function FormItem (parentProps, context) {
  if (!parentProps.form) return null
  const { children, options, form, ...props } = parentProps
  const { getFieldDecorator } = form

  const childrenWithProps = React.Children.map(children, child =>
    getFieldDecorator(child.props.name, options)(child),
  )

  return (
    <Form.Item {...props}>
      {childrenWithProps}
    </Form.Item>
  )
}

FormItem.defaultProps = {
  options: {},
}
