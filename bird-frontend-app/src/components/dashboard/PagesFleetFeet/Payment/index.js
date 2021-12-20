import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { pay, getEvent } from 'modules/feet/feet-actions'
import { useLocation, useHistory } from 'react-router-dom'
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js'
import { Layout, Button } from '../components'
import YourOrder from '../Registration/YourOrder'
import PaymentForm from './PaymentForm'
import { notification } from 'antd'
import css from './index.less'

const Payment = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const id = pathname?.split('/')[2]
  const [isFirst, setIsFirst] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorInput, setErrorInput] = useState({ cardNumber: '', cardExpiry: '', cardCvc: '' })
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvent(id))
  }, [])

  const onChangeError = e => setErrorInput(errorInput => ({
    ...errorInput, [e.elementType]: e.error ? e.error.code : '',
  }))

  const onFinish = async () => {
    const { cardCvc, cardExpiry, cardNumber } = errorInput
    const errorLength = Object.values(errorInput).find(i => i.length)

    setIsFirst(false)

    const cardElement = elements.getElement(CardNumberElement)

    if (!stripe || !elements || errorLength || cardCvc || cardExpiry || cardNumber) return

    await stripe.createToken(cardElement).then(({ error, token }) => {
      if ((!cardCvc || !cardExpiry || !cardNumber) && isFirst && !token) return null
      if (error) {
        notification.error({ message: error?.message || 'There is an error with your payment, please correct your card details.' })

        return null
      }
      setLoading(true)
      dispatch(pay({ token: token.id, eventAlias: id })).then(res => {
        if (res) {
          history.push(`/event/${id}/confirmation`)
        }
        setLoading(false)
      })
    })
  }

  return (
    <Layout>
      <div className={css.wrapperPayment}>
        <PaymentForm errorInput={errorInput} onChangeError={onChangeError} />
        <YourOrder />
      </div>
      <div className={css.actions}>
        <div className={css.line} />
        <Button text='complete registration' type='black' onClick={onFinish} loading={loading} />
      </div>
    </Layout>
  )
}

export default Payment
