import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getChartWorkout } from 'modules/plans/plans-actions'
import { Modal } from 'antd'
import { ListIcons, HeaderWorkout, CircleChart, LineChart, AthleteNotes } from 'components'
import c from 'classnames'
// import PaidFooter from './PaidFooter'
import css from './index.less'

const Section = ({ title, value, className }) => (
  <div className={className || css.section}>
    <div className={css.title}>{title}</div>
    <div className={css.value}>{value}</div>
  </div>
)

const Box = ({ children }) => (
  <div className={css.box}>
    {children}
  </div>
)

const DetailWorkout = ({ workout, onCancel }) => {
  const [dataChart, setDataChart] = useState([])
  const { measurement } = useSelector(({ session }) => session)
  const { pacesWorkout } = useSelector(({ athlets }) => athlets)
  const dispatch = useDispatch()

  const valuePace = pacesWorkout?.find(i => i?.paceId === workout?.pace?.paceId)

  useEffect(() => {
    if (workout?.workoutId) {
      dispatch(getChartWorkout(workout?.workoutId)).then(({ data = [] }) => {
        const newLineChart = data.map((i, ind) => ({ uv: i.pace, day: workout, distance: +i?.distance?.toFixed(2) }))
        setDataChart(newLineChart)
      })
    }
  }, [])

  const distance = workout?.distance || 0

  return (
    <Modal visible onCancel={onCancel} className={css.detailWorkout} footer={null} centered width={800}>
      <header>
        <HeaderWorkout date={workout.date} status={workout?.status?.statusId} />
        <ListIcons workout={workout} />
      </header>

      <div className={css.boxs}>
        <Box>
          <h2 className={css.boxTitle}>Assigned</h2>

          <div className={css.row}>
            <div className={css.column}>
              <Section title='type' value={workout?.workoutType?.name || '-'} />
              <Section
                title={workout?.time ? 'time' : 'distance'}
                value={workout?.time ? workout?.time : (workout?.distance === undefined || workout?.distance === null) ? '-' : workout?.distance}
              />
            </div>

            <div className={css.column}>
              <Section title='name' value={workout?.name || '-'} />
              <Section title='pace' value={valuePace?.value || '-'} />
            </div>
          </div>
        </Box>

        <Box>
          <h2 className={css.boxTitle}>Completed</h2>

          <div className={css.row}>
            <div className={css.column}>
              <Section title='total time' value={workout?.movingTime} />
              <Section title='average pace' value={`${workout?.avgPace === null || workout?.avgPace === undefined ? '-' : workout?.avgPace} /${measurement === 1 ? 'mi' : 'km'}`} />
            </div>

            <CircleChart
              total={(distance && workout?.completedDistance) ? (distance * 4 / 3) || 1 : 1}
              assigned={distance}
              completed={workout?.completedDistance}
              title={measurement === 1 ? 'miles' : 'kilometers'}
            />
          </div>
        </Box>
      </div>

      <div className={css.body}>
        <div className={css.left}>
          <h2 className={css.boxTitle}>Workout Notes</h2>
          {workout?.description ? (
            <p className={css.valueNotes}>{workout?.description}</p>
          ) : (
            <p className={c(css.valueNotes, css.valueNotesNone)}>None</p>
          )}
        </div>

        <div className={css.right}>
          <AthleteNotes workoutId={workout?.workoutId} />
        </div>
      </div>

      {/* {coachPlan?.coachPlanId === 1 ? (
        <PaidFooter />
      ) : (
        <footer className={css.freeFooter}>
          <Box>
            <h2 className={css.boxTitle}>Pace</h2>
            <Section title='average pace' value={`${workout?.avgPace}/${measurement === 1 ? 'mi' : 'km'}` || '-'} />
            {dataChart?.length > 1 ? <LineChart data={dataChart} avgPace={workout?.avgPace} /> : <div className={css.line} />}
          </Box>
        </footer>
      )} */}

      <footer className={css.freeFooter}>
        <Box>
          <h2 className={css.boxTitle}>Pace</h2>
          <Section title='average pace' value={`${workout?.avgPace === null || workout?.avgPace === undefined ? '-' : workout?.avgPace}/${measurement === 1 ? 'mi' : 'km'}` || '-'} />
          {dataChart?.length > 1 ? <LineChart data={dataChart} avgPace={workout?.avgPace} /> : <div className={css.line} />}
        </Box>
      </footer>
    </Modal>
  )
}

export default DetailWorkout
