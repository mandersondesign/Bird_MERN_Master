import React from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import css from './index.less'
import c from 'classnames'

const fieldItem = (label, value, errValue, isError) => (
  <div className={c(css.fieldItem, { [css.isErrorWrapper]: isError })}>
    <div className={css.label}>{label}</div>
    <div className={css.inputs}>
      {value}
      {errValue}
    </div>
  </div>
)

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

const FormPayment = ({ onChangeError, errorInput }) => {
  return (
    <div className={css.wrapperFormPayment}>
      <div className={css.title}>Enter a payment method</div>
      {fieldItem('Card Number',
        <CardNumberElement placeholder='Card number' className={css.input} showIcon onChange={onChangeError} />,
        <div className={c(css.errorMessage, css.errorMessageCreditCard)}>{errorInput.cardNumber && objNumber[errorInput.cardNumber]}</div>,
        !!errorInput.cardNumber,
      )}
      {fieldItem('Exp. Data',
        <CardExpiryElement className={css.input} onChange={onChangeError} />,
        <div className={css.errorMessage}>{errorInput.cardExpiry && objDate[errorInput.cardExpiry]}</div>,
        !!errorInput.cardNumber,
      )}
      {fieldItem('Security Code',
        <CardCvcElement className={css.input} onChange={onChangeError} />,
        <div className={css.errorMessage}>{errorInput.cardCvc && objCvc[errorInput.cardCvc]}</div>,
        !!errorInput.cardNumber,
      )}

    </div>
  )
}

export default FormPayment
