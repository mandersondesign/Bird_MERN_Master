import { getCurrentUser, getCards } from 'modules/session/session-actions'
import { subscriptionPlan } from 'modules/onboarding/onboarding-actions'
import { showPaymentForm } from 'modules/plans/plans-actions'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FormPayment } from 'components'
import css from './index.less'

const CPPaymentForm = () => {
  const { token: userToken, user } = useSelector(state => state.session)
  const { selectedSubscription } = useSelector(state => state.plans)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(showPaymentForm())
    }
  }, [])

  if (!selectedSubscription) return null

  const onFinishPay = token => {
    const data = {
      coachPlanId: selectedSubscription.coachPlanId,
      token: token.id,
    }

    dispatch(subscriptionPlan(data)).then(res => {
      if (res !== 'error') {
        dispatch(showPaymentForm())
        dispatch(getCards(user.userId))
        dispatch(getCurrentUser(userToken))
      }
    })
  }

  return selectedSubscription ? (
    <div className={css.paymentForm}>
      <div>
        <div className={css.mainTitle}>Enter a payment method</div>
        <div className={css.description}>{`${selectedSubscription.name} plan ($${parseInt(selectedSubscription.price)}/mo)`}</div>
        <FormPayment text={`PAY $${parseInt(selectedSubscription.price)}`} backColor='#F9F9F9' onFinishPay={onFinishPay} flexDirection='row' />
      </div>
    </div>
  ) : null
}

export default CPPaymentForm
