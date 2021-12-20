import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { Button, Form } from 'antd'
import { subscriptionPlan } from 'modules/onboarding/onboarding-actions'
import css from './styles.less'

const objNumber = {
  invalid_number: 'The card number is not a valid credit card number',
  incorrect_number: 'The card number is incorrect',
  incomplete_number: 'The card number is incomplete',
}

const objCvc = {
  invalid_cvc: 'The card’s security code is invalid',
  incomplete_cvc: 'The card’s security code is incomplete',
  incorrect_cvc: 'The card’s security code is incorrect',
}

const objDate = {
  invalid_expiry_month: 'The card’s expiration month is invalid',
  invalid_expiry_year: 'The card’s expiration year is invalid',
  incomplete_expiry: 'The card’s expiration date is incomplete',
  expired_card: 'The card has expired',
  invalid_expiry_year_past: 'The card’s expiration year is in the past',
}

const { Item } = Form

const Payment = ({ id }) => {
  const dispatch = useDispatch()
  const [errorInput, setErrorInput] = useState({ cardNumber: '', cardExpiry: '', cardCvc: '' })
  const onChangeError = e => setErrorInput({ ...errorInput, [e.elementType]: e.error ? e.error.code : '' })

  const onSubmit = e => {
    e.preventDefault()
    dispatch(subscriptionPlan(id))
  }

  return (
    <div className={css.wrapperFormPayment}>
      <div className={css.title}>
        Enter card details
      </div>
      <Form layout='vertical' className={css.form} onSubmit={onSubmit}>
        <div className={css.items}>
          <div>
            <Item name='numberCard' className={[css.item, css.itemStripe, css.creditCard].join(' ')}>
              <CardNumberElement placeholder='Card number' className={css.input} showIcon onChange={onChangeError} />
            </Item>
            <div className={[css.errorMessage, css.errorMessageCreditCard].join(' ')}>{errorInput.cardNumber && objNumber[errorInput.cardNumber]}</div>
          </div>
          <div>
            <Item name='date' className={[css.item, css.itemStripe].join(' ')}>
              <CardExpiryElement className={css.input} onChange={onChangeError} />
            </Item>
            <div className={css.errorMessage}>{errorInput.cardExpiry && objDate[errorInput.cardExpiry]}</div>
          </div>
          <div>
            <Item name='code' className={[css.item, css.itemStripe].join(' ')}>
              <CardCvcElement className={css.input} onChange={onChangeError} />
            </Item>
            <div className={css.errorMessage}>{errorInput.cardCvc && objCvc[errorInput.cardCvc]}</div>
          </div>
        </div>
        <div className={css.wrapperActions}>
          <Button className={css.button} htmlType='submit'>Pay 10$</Button>
        </div>
      </Form>
    </div>
  )
}

export default Payment
