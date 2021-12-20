import React, { memo } from 'react'
import Chart from './Chart'
import css from './index.less'

const Workouts = ({ workouts: { total, assigned, completed } }) => {
  const attr = { total, assigned, completed }

  return (
    <div className={css.wrapperWorkouts}>
      <div className={css.header}>
        <span className={css.title}>Workouts</span>
        <span className={css.count}>{assigned} Workouts Assigned</span>
        <span className={css.count}>{total} Total Workouts</span>
      </div>

      <Chart {...attr} />
    </div>
  )
}

export default memo(Workouts)
