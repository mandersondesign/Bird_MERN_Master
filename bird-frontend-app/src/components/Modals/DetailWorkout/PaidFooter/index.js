import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { subscriptionPlan } from 'modules/onboarding/onboarding-actions'
import { getCoach } from 'modules/session/session-actions'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import c from 'classnames'
import mobile from './mobile.png'
import css from './index.less'

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

const PaidFooter = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errorInput, setErrorInput] = useState({ cardNumber: '', cardExpiry: '', cardCvc: '' })
  const { token: tokenUser } = useSelector(({ session }) => session)
  const dispatch = useDispatch()

  const stripe = useStripe()
  const elements = useElements()

  const onChangeError = e => setErrorInput(errorInput => ({
    ...errorInput, [e.elementType]: e.error ? e.error.code : '',
  }))

  const coaching = [
    'Athletes can automatically log workouts through Strava',
    'Compare actual time, distance, and average pace to what was assigned',
    'Mile and interval pace analysis for every workout',
    'Up to 20 athletes and unlimited templates',
  ]

  const onChangeStep = num => () => setStep(num)

  // const closeIcon = <CloseOutlined className={css.iconClose} onClick={onChangeStep(0)} />

  const body = (
    <>
      <img src={mobile} className={css.iconMobile} />

      <h2 className={css.title}>More insights. Less time.</h2>
      <h3 className={css.subTitle}>upgrade your coaching</h3>

      <ul>
        {coaching.map(i => (
          <li key={i}>
            <div className={css.wrapperImg}>
              <img src='/img/checkmark_plans.svg' className={css.iconCheck} />
            </div>
            <p>{i}</p>
          </li>
        ))}
      </ul>
    </>
  )

  const onFinish = async () => {
    const errorLength = Object.values(errorInput).find(i => i.length)
    if (!stripe || !elements || errorLength) return

    const cardElement = elements.getElement(CardNumberElement)

    await stripe.createToken(cardElement).then(async ({ error, token }) => {
      if (error) return null
      setLoading(true)
      dispatch(subscriptionPlan({ coachPlanId: 2, token: token?.id })).then(res => {
        dispatch(getCoach(tokenUser)).then(() => {
          setLoading(false)
        })
      })
    })
  }

  const obj = {
    1: () => (
      <div className={c(css.container, css.firstStep)}>
        <div className={css.phone} />

        <div className={css.bodyAbs}>
          <h2 className={css.title}>Want more insights about this workout?</h2>
          <p className={css.desc}>Upgrade to a core plan for Strava data and pace analysis.</p>

          <Button className={css.btn} onClick={onChangeStep(step + 1)}>Learn More</Button>
        </div>
      </div>
    ),
    2: () => (
      <div className={c(css.container, css.secontStep)}>
        {body}

        <Button className={c(css.btn, css.secondBtn)} onClick={onChangeStep(step + 1)}>upgrade to core $39/mo</Button>
      </div>
    ),
    3: () => (
      <div className={c(css.container, css.secontStep)}>
        {body}

        <h3 className={c(css.subTitle, css.subTitleStripe)}>Enter a payment method</h3>

        <div className={css.formStripe}>
          <div className={css.wrapperInput}>
            <div className={c(css.wrapperStripeElement, css.StripeElementCard)}>
              <CardNumberElement placeholder='Card number' className={css.input} showIcon onChange={onChangeError} />
            </div>
          </div>

          <div className={css.wrapperInput}>
            <div className={c(css.wrapperStripeElement, css.wrapperWidth)}>
              <CardExpiryElement className={css.input} onChange={onChangeError} />
            </div>
          </div>

          <div className={css.wrapperInput}>
            <div className={c(css.wrapperStripeElement, css.wrapperWidth)}>
              <CardCvcElement className={css.input} onChange={onChangeError} />
            </div>
          </div>
        </div>

        <div className={css.errorMessage}>
          {objNumber[errorInput.cardNumber] || objDate[errorInput.cardExpiry] || objCvc[errorInput.cardCvc]}
        </div>

        <Button loading={loading} className={c(css.btn, css.secondBtn, css.thirdBtn)} onClick={onFinish}>upgrade to core $39/mo</Button>
      </div>
    ),
  }

  return (
    <footer className={css.paidFooter}>
      {obj[step]?.()}
    </footer>
  )
}

export default PaidFooter
