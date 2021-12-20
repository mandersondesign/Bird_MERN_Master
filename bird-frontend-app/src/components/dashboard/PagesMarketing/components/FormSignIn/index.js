import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { Form, Input } from 'antd'
import { login, getCurrentPlan } from 'modules/marketing/actions'
import Button from '../Button'
import css from './index.less'

const { Item } = Form

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const FormInput = props => <Input className={css.input} {...props} />

const FormSignIn = ({ onSubmit, form }) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const refForm = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const { alias } = useParams()
  const { search } = useLocation()

  const onChangeValues = async e => {
    await form.validateFields([e.target.value], { force: true })
    const values = form.getFieldsValue()
    const fieldsError = form.getFieldsError()
    const hasError = Object.keys(fieldsError).some(field => fieldsError[field])
    const hasBlankField = !values.Email || !values.Password

    setDisabled(hasError || hasBlankField)
  }

  const onFinish = () => {
    form.validateFields((err, values) => {
      if (err) return

      setLoading(true)

      const data = {
        email: values.Email,
        password: values.Password,
        platform: 'web',
      }

      dispatch(login(data)).then(res => {
        if (res) {
          dispatch(getCurrentPlan(res?.token, res?.user?.userId)).then(res => {
            if (res) {
              // history.push(search?.split('&')?.[0]?.includes('subscription') ? `/${alias}?subscription` : `/${alias}`)
              history.push(`/${alias}${search}`)
            }
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    })
  }

  return (
    <div className={css.container}>
      <Form {...layout} form={form} ref={refForm}>
        <Item name='Email'>
          {form.getFieldDecorator('Email', {
            rules: [
              {
                required: true,
                message: 'Email is required',
              },
              {
                type: 'email',
                message: 'Please enter valid email',
              },
            ],
          })(
            <FormInput placeholder='Email' onChange={onChangeValues} />,
          )}
        </Item>
        <Item name='Password'>
          {form.getFieldDecorator('Password', {
            rules: [
              {
                required: true,
                message: 'Password is required',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters',
              },
            ],
          })(
            <FormInput placeholder='Password' onChange={onChangeValues} />,
          )}
        </Item>
      </Form>

      <Button title='Sign In' customClass={css.btn} onClick={onFinish} disabled={disabled} loading={loading} />
    </div>
  )
}

const WrappedFrom = Form.create()(FormSignIn)
const FormWrapperForm = props => <WrappedFrom {...props} />

export default FormWrapperForm
