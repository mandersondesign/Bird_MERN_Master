import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, message } from '..'

// export type FormPropTypes = {
//   getFieldDecorator: Function,
//   getFieldError: Function,
//   getFieldProps: Function,
//   getFieldValue: Function,
//   isSubmitting: Function,
//   validateFields: Function,
//   resetFields: Function,
//   setFields: Function,
// };
//
// export type FormComponentPropTypes = {
//   children: any,
//   form: FormPropTypes,
//   onSubmit?: Function,
//   onSuccess?: Function,
//   onFailure?: Function,
// };

class FormComponent extends Component {
  static childContextTypes = {
    form: PropTypes.object,
  };

  static defaultProps = {
    onSubmit: () => null,
    onSuccess: () => null,
    onFailure: () => null,
  };

  getChildContext () {
    const { form } = this.props
    return { form }
  }

  onSubmit = e => {
    e.preventDefault()
    const { onSubmit = _.noop, form } = this.props

    form.validateFields((errors, fields) => {
      // console.log('errors >>>', errors)
      // console.log('fields >>>', fields)
      const fieldNames = _.keys(fields)
      const normalizedFields = _.reduce(
        fields,
        (acc, value, key) => {
          const result = acc
          if (!result[key]) result[key] = { value, errors: _.get(errors, `${key}.errors`, []) }
          return result
        },
        {},
      )

      onSubmit({
        form,
        fields,
        errors,

        onSuccess: () => {
          form.resetFields(fieldNames)
        },

        onFailure: res => {
          // Merge field values with server errors

          const syncedFields = _.reduce(
            _.get(res, 'errors', []),
            (result, error) => {
              const key = _.keys(error).pop()
              const value = _.values(error).pop()

              if (key === '_error') message.error(value)

              if (!result[key]) return result
              result[key].errors.push({ message: value, field: key })
              return result
            },
            normalizedFields,
          )

          // Clean up empty errors
          _.each(syncedFields, syncedField => {
            if (!syncedField.errors.length) _.unset(syncedField, 'errors')
          })

          form.setFields(syncedFields)
        },
      })
    })
  };

  onReset = () => this.props.form.resetFields()

  render () {
    const { children, form, wrappedComponentRef, ...props } = this.props
    const formProps = _.omit(props, ['wrappedComponentRef', 'onSuccess', 'onFailure'])

    return (
      <Form {...formProps} onSubmit={this.onSubmit} onReset={this.onReset} ref={wrappedComponentRef}>
        {children}
      </Form>
    )
  }
}

export default Form.create()(FormComponent)
