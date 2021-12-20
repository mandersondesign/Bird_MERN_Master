import React from 'react'
import { WorkoutType } from 'components'
import moment from 'moment'
import css from './index.less'

const HeaderWorkout = ({ date, status }) => (
  <div className={css.dateWorkout}>
    <div className={css.day}>{moment(date).format('dddd')}</div>
    <div className={css.bottom}>
      <div className={css.date}>{moment(date).format('MMMM D, YYYY')}</div>
      {status && <WorkoutType status={status} />}
    </div>
  </div>
)

export default HeaderWorkout
