import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Form, Select } from 'antd'
import { Input } from 'components'
import { CreditCard } from '../../components'
import { states } from 'utils/listOfStates'
import css from './index.less'

const { Item } = Form
const { Option } = Select;

const FormInput = props => <Input className={css.input} shouldMask={false} {...props} />

const FormSignUp = ({ onSubmit, form, onChangeValues, cardError, setIsComplete, setCardError, refForm }) => {
  const { pathname } = useLocation()
  const { alias } = useParams()
  const isPaymentPath = [`/sign-up/${alias}`, `/${alias}`].includes(pathname)

  return (
    <div className={css.container}>
      <Form form={form} ref={refForm}>
        <Item name='email'>
          {form.getFieldDecorator('email', {
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
          })(<FormInput placeholder='Email' onChange={onChangeValues} />)}
        </Item>

        {isPaymentPath ? (
          <CreditCard
            cardError={cardError}
            isCard={false}
            setCardError={setCardError}
            setIsComplete={setIsComplete}
          />
        ) : null}

        <div className={css.section}>
          <div className={css.title}>Billing Address</div>
          <Item name='firstName'>
            {form.getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'First Name is required' }],
            })(
              <FormInput placeholder='First name' onChange={onChangeValues} />,
            )}
          </Item>
          <Item name='lastName'>
            {form.getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Last Name is required' }],
            })(<FormInput placeholder='Last name' onChange={onChangeValues} />)}
          </Item>
          <Item name='address'>
            {form.getFieldDecorator('address', {
              rules: [{ required: true, message: 'Address is required' }],
            })(<FormInput placeholder='Address' onChange={onChangeValues} />)}
          </Item>
          <Item name='city'>
            {form.getFieldDecorator('city', {
              rules: [{ required: true, message: 'City is required' }],
            })(<FormInput placeholder='City' onChange={onChangeValues} />)}
          </Item>
          <div className={css.stateZipWrapper}>
            <Item name='state'>
              {form.getFieldDecorator('state', {
                rules: [{ required: true, message: 'State is required' }],
              })(
                <Select
                  showSearch
                  name='state'
                  placeholder='State'
                  className={css.selectState}
                  onChange={onChangeValues}
                >
                  {states.map(state => <Option key={state} value={state}>{state}</Option>)}
                </Select>,
              )}
            </Item>
            <Item name='zipCode'>
              {form.getFieldDecorator('zipCode', {
                rules: [
                  { required: true, message: 'Zip code is required' },
                  {
                    pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                    message: 'Please enter valid zip code',
                  },
                ],
              })(<FormInput placeholder='Zip code' onChange={onChangeValues} autoComplete='chrome-off' />)}
            </Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

const WrappedFrom = Form.create()(FormSignUp)
const FormWrapperForm = props => <WrappedFrom {...props} />

export default FormWrapperForm
