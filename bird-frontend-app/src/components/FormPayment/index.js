import React, { useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { Button } from 'components/CustomButton'
import css from './index.less'
import c from 'classnames'

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

const FormPayment = ({ text = '', backColor, onFinishPay = () => { }, flexDirection = 'column' }) => {
  const [loading, setLoading] = useState(false)
  const [errorInput, setErrorInput] = useState({ cardNumber: '', cardExpiry: '', cardCvc: '' })

  const stripe = useStripe()
  const elements = useElements()

  const onChangeError = e => setErrorInput(errorInput => ({
    ...errorInput, [e.elementType]: e.error ? e.error.code : '',
  }))

  const onFinish = async () => {
    const errorLength = Object.values(errorInput).find(i => i.length)
    if (!stripe || !elements || errorLength) return

    const cardElement = elements.getElement(CardNumberElement)

    await stripe.createToken(cardElement).then(async ({ error, token }) => {
      if (error) return null
      setLoading(true)
      onFinishPay(token, () => setLoading(false))
    })
  }

  const style = { backgroundColor: backColor || '#f9f9f9' }

  return (
    <div className={css.wrapperFormPayment}>
      <div className={css.items}>
        <div className={css.top}>
          <div className={c(css.wrapperStripeElement, css.StripeElementCard)} style={style}>
            <CardNumberElement placeholder='Card number' className={css.input} showIcon onChange={onChangeError} />
          </div>
          <div className={c(css.errorMessage, css.errorMessageCreditCard)}>{errorInput.cardNumber && objNumber[errorInput.cardNumber]}</div>
        </div>

        <div className={css.bottom}>

          <div>
            <div className={css.wrapperStripeElement} style={style}>
              <CardExpiryElement className={css.input} onChange={onChangeError} />
            </div>
            <div className={css.errorMessage}>{errorInput.cardExpiry && objDate[errorInput.cardExpiry]}</div>
          </div>

          <div>
            <div className={css.wrapperStripeElement} style={style}>
              <CardCvcElement className={css.input} onChange={onChangeError} />
            </div>
            <div className={css.errorMessage}>{errorInput.cardCvc && objCvc[errorInput.cardCvc]}</div>
          </div>

        </div>
      </div>
      <div className={css.wrapperActions}>
        <Button size={Button.SIZE_LARGE} face={Button.FACE_PRIMARY} onClick={onFinish} loading={loading}>{text}</Button>
      </div>
    </div>
  )
}

export default FormPayment
