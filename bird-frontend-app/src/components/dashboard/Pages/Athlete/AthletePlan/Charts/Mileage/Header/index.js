import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import css from './index.less'

const Item = ({ title, value }) => (
  <div className={css.section}>
    <div className={css.subTitle}>{title}</div>
    <div className={css.textMiles}>{value}</div>
  </div>
)

export const timeFormat = seconds => {
  const h = seconds / 3600 ^ 0
  const m = (seconds - h * 3600) / 60 ^ 0
  const s = seconds - h * 3600 - m * 60

  return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
}

const Header = ({ title, milesRan, milesAssigned, activeDay, numChart, activeWeek, activeTab, assignedTime, completedTime }) => {
  const { measurement, user: { coachPlan } } = useSelector(({ session }) => session)
  let data = []

  const msrt = measurement === 1 ? 'miles' : 'kilometers'
  const msrtShort = measurement === 1 ? 'mi' : 'km'

  // if (numChart === 3 && coachPlan?.coachPlanId === 1) return null

  if (numChart === 3) {
    const { distance, completedDistance, avgPace, time, movingTime } = activeDay

    const objAvg = { title: 'Average Pace', value: (avgPace === undefined || avgPace === null) ? '-' : `${avgPace} /${msrtShort}` }

    const completed = (completedDistance === undefined || completedDistance === null) ? '-' : completedDistance?.toFixed(1)
    const assigned = (distance === undefined || distance === null) ? '-' : distance

    if (activeTab === 1) {
      data = [
        {
          title: 'Completed / Assigned',
          value: `${completed} / ${assigned} ${msrt} `,
        },
        // { title: 'Miles Completed', value: (completedDistance === undefined || completedDistance === null) ? '-' : `${completedDistance} ${msrt}` },
        // { title: 'Assigned Pace', value: (value === undefined || value === null) ? '-' : `${value} /${msrtShort}` },
        objAvg,
        // { title: 'Time Ran', value: (movingTime === undefined || movingTime === null) ? '-' : movingTime },
      ]
    } else {
      data = [
        {
          title: 'Time assigned',
          value: time || '-',
        },
        {
          title: 'Time completed',
          value: movingTime || '-',
        },
        objAvg,
      ]
    }
  }

  const content = activeTab === 1 ? (
    <div>
      <div className={css.subTitle}>Completed / Assigned</div>
      <div className={css.textMiles}>{milesRan?.toFixed(1)} / {+milesAssigned?.toFixed(1)} {msrt}</div>
    </div>
  ) : (
    <div className={css.rows}>
      <Item title='Time Assigned' value={numChart === 2 ? timeFormat(activeWeek?.minutesPerWeek * 60) : assignedTime} />
      <Item title='Time Completed' value={numChart === 2 ? timeFormat(activeWeek?.completedMinutesPerWeek * 60) : completedTime} />
    </div>
  )

  return (
    <div className={css.header}>
      <div className={css.left}>
        <div className={css.title}>{title}</div>

        {data.length ? (
          <div className={css.rows}>
            {data.map(i => <Item key={i.title} {...i} />)}
          </div>
        ) : content}

      </div>

      {/* <div className={css.right}>
        <div className={css.ranText}>
          <div className={css.circle} /> ran
        </div>

        <div className={css.assignedText}>
          <div className={css.circle} /> assigned
        </div>
      </div> */}
    </div>
  )
}

export default memo(Header)
