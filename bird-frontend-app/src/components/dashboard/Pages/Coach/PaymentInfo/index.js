import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCard, getCards } from 'modules/session/session-actions'
import { Button, ModalProfile } from 'components'
import css from '../index.less'
import { WarningFilled } from '@ant-design/icons'

const PaymentInfo = () => {
  const [visible, setVisible] = useState(false)
  const { stripeCards = [], user } = useSelector(state => state.session)
  const dispatch = useDispatch()

  const onChange = () => setVisible(!visible)

  const onFinish = (token, func) => {
    dispatch(updateCard({ token: token.id })).then(() => {
      dispatch(getCards(user.userId)).then(() => {
        func()
        onChange()
      })
    })
  }

  const textTitle = stripeCards.length ? 'Update card' : 'Add new card'
  const attr = { visible, onChange, onFinish, name: 'payment', width: 500, textTitle }
  return (
    <div className={css.sectionProfile}>
      <div className={css.head}>
        <div className={css.titleSection}>Payment information</div>
        <Button size='default' smallBtn className={css.profileBtn} btnText={stripeCards.length ? 'Update' : 'Add'} onClick={onChange} />
      </div>

      <div className={css.body}>
        {user?.coachPlan?.errorMessage
          ? (
            <div className={css.warningFilledWrapper}>
              <WarningFilled />{' '}
              Please update your payment method
            </div>
          )
          : stripeCards.map((card, index) => (
            <div key={index} className={css.wrapperCard}>
              <div className={css.left}>Card number ****{card.last4}</div>
              <div className={css.right}>Expiration date {card.expMonth}/{card.expYear}</div>
            </div>
          ))}
      </div>

      {visible && <ModalProfile {...attr} />}
    </div>
  )
}

export default PaymentInfo
