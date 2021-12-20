import React, { useState } from 'react'
import { updatePaces } from 'modules/athlets/athlets-actions'
import { useDispatch } from 'react-redux'
import { TimePicker } from 'antd'
import moment from 'moment'
import css from './index.less'

const Card = ({ title, value, paceId, planId }) => {
  const dispatch = useDispatch()
  const [cardValue = value === 'Invalid date' ? '00:00' : value, setCardValue] = useState()

  const setText = e => {
    setCardValue(e)

    const newPace = { pace_id: paceId, value: moment(e).format('mm:ss') }
    const obj = { paces: [newPace] }

    dispatch(updatePaces(planId, obj))
  }

  return (
    <div className={css.wrapperCardOfPace}>
      <div className={css.title}>{title}</div>
      <TimePicker
        value={moment(cardValue || '00:00', 'mm:ss')}
        format='mm:ss'
        onChange={setText}
        className={css.value}
        id={title}
      />
    </div>
  )
}

export default Card
