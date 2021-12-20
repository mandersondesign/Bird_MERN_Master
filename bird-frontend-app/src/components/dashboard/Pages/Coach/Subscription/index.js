import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscriptionPlan } from 'modules/onboarding/onboarding-actions'
import { getCurrentUser } from 'modules/session/session-actions'
import { showPaymentForm } from 'modules/plans/plans-actions'
import { fetchSubscriptionsForAdmins } from 'modules/subscriptions/subscriptions-actions'
import { Button, ModalProfile } from 'components'
import { Skeleton } from 'antd'
import css from '../index.less'

const Subscription = () => {
  const [visible, setVisible] = useState(false)
  const { user, token, stripeCards = [] } = useSelector(state => state.session)
  const { adminsPlans } = useSelector(({ subscriptions }) => subscriptions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSubscriptionsForAdmins(true))
  }, [])

  const onChange = () => setVisible(!visible)

  const onFinish = id => {
    if (stripeCards.length) {
      dispatch(subscriptionPlan({ coachPlanId: id })).then(res => {
        if (res !== 'error') {
          dispatch(getCurrentUser(token)).then(() => dispatch(fetchSubscriptionsForAdmins()))
        }
      })
    } else {
      dispatch(showPaymentForm(adminsPlans.find(i => i.coachPlanId === id)))
      setTimeout(() => {
        // Force scrolling
        document.querySelector('.ant-modal-wrap').scrollTo({ top: 99999 })
      }, 0)
    }
  }

  const subscription = adminsPlans.find(i => i.coachPlanId === user?.coachPlan?.coachPlanId)

  return (
    <div className={[css.sectionProfile, css.sectionProfileRow].join(' ')}>
      <div className={[css.left, css.titleSubscription].join(' ')}>
        <div className={css.titleSection}>Subscription</div>
        <p className={css.subscriptionName}>
          {subscription?.name ? (
            <>
              {subscription?.name || ''}
              {' '}
              {subscription?.price !== 0 && `$${subscription?.price || ''} per month`}
            </>
          ) : <Skeleton active title={{ width: 70 }} />}
        </p>
      </div>
      <Button size='default' smallBtn className={css.profileBtn} btnText='Change' onClick={onChange} />

      {visible && <ModalProfile visible={visible} onChange={onChange} name='plans' onFinish={onFinish} width={1000} />}
    </div>)
}

export default Subscription
