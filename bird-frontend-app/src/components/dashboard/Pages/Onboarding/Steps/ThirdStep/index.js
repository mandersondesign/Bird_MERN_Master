import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getInfo } from 'modules/onboarding/onboarding-actions'
import { Button, FormPayment } from 'components'
import { formatPhoneNumber, isAdmin } from 'utils'
import c from 'classnames'
import css from './index.less'
import { fetchSubscriptionsForCoaches } from 'modules/subscriptions/subscriptions-actions'

const Information = ({ item, index, lastIndex }) => (
  <div className={c(css.wrapperInformation, { border: index !== lastIndex - 1 })}>
    <div className={css.left}>{item.title}</div>
    {item.title === 'Photo' ? <img className={c(css.right, css.avatar)} src={item.text} /> : <div className={css.right}>{item.text}</div>}
  </div>
)

const ThirdStep = ({ onFinishPay }) => {
  const {
    session: { user: { email, phone, name, avatar, userId, userTypeId } },
    onboarding: { info: { specialties = [], about } },
    subscriptions: { coachPlans },
  } = useSelector(state => state)
  const history = useHistory()
  const dispatch = useDispatch()

  const activeId = window.location.pathname.split('/')[4]
  useEffect(() => {
    if (!isAdmin({ userTypeId })) {
      dispatch(getInfo(userId))
    }
    if (!coachPlans.length) {
      dispatch(fetchSubscriptionsForCoaches())
    }
  }, [])

  const infTop = [
    {
      title: 'Full name',
      text: name,
    },
    {
      title: 'Phone number',
      text: formatPhoneNumber(phone),
    },
    {
      title: 'Email',
      text: email,
    },
  ]

  const infBottom = [
    {
      title: 'Photo',
      text: avatar,
    },
    {
      title: 'Specialties',
      text: specialties.join(', '),
    },
    {
      title: 'Coach bio',
      text: about,
    },
  ]

  const goEditPlan = step => {
    const path = window.location.pathname
    if (path.includes('plan')) {
      const activeId = path.split('/')[4]
      history.push(`/steps/${step}/plan/${activeId}`)
    } else {
      history.push(`/steps/${step}`)
    }
  }

  const subscription = coachPlans.find(i => i.coachPlanId === +activeId)

  return (
    <div className={css.wrapperThirdStep}>
      <div className={css.sectionProfile}>
        <div className={css.head}>
          <div className={css.titleSection}>Your info</div>
        </div>

        <div className={css.body}>
          {infTop.map((i, ind) => <Information item={i} index={ind} key={i.title} lastIndex={infTop.length} />)}
        </div>
      </div>

      <div className={css.sectionProfile}>
        <div className={css.head}>
          <div className={css.titleSection}>Your profile</div>
          <Button size='default' smallBtn className={css.profileBtn} btnText='Edit' onClick={() => goEditPlan(1)} />
        </div>

        <div className={css.body}>
          {infBottom.map((i, ind) => <Information item={i} index={ind} key={i.title} lastIndex={infBottom.length} />)}
        </div>
      </div>

      {subscription ? (
        <div className={css.sectionProfile}>
          <div className={css.head}>
            <div className={css.left}>
              <div className={css.titleSection}>{subscription?.name}{' '}plan</div>
              <div className={css.price}>${subscription?.price}/mo</div>
            </div>
            <Button size='default' smallBtn className={css.profileBtn} btnText='Change' onClick={() => goEditPlan(2)} />
          </div>
        </div>
      ) : null}
      {subscription?.name !== 'Free' && (
        <div className={c(css.sectionProfile, css.formPayment)}>
          <div className={css.head}>
            <div className={css.titleSection}>Enter a payment method</div>
          </div>
          <FormPayment text={`Pay $${parseInt(subscription?.price)}`} onFinishPay={onFinishPay} />
        </div>
      )}
    </div>
  )
}

export default ThirdStep
