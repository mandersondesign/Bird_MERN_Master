import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import Truncate from 'react-truncate'
import { ListIcons, WorkoutType } from 'components'
import { PlusCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import c from 'classnames'
import css from './index.less'
import { ScheduleTextPopover } from '../../ScheduleTextPopover'

const Section = memo(({ title, blackText, text, measurment, className }) => (
  <div className={className || css.section}>
    <div className={css.title}>{title}</div>
    <p className={css.value}>
      {blackText && <div className={css.black}>{blackText}</div>}
      {text}
      {measurment && <div className={css.measurment}>{measurment}</div>}
    </p>
  </div>
))

const Card = ({ workout, isEmpty, setWorkout }) => {
  const { measurement } = useSelector(({ session }) => session)
  const [isVisible, setIsVisible] = useState(false)
  const today = moment(Date.now()).format('YYYY-MM-DD')
  const isToday = today === moment(workout.date).format('YYYY-MM-DD')
  const isPrevDay = today >= moment(workout.date).format('YYYY-MM-DD')

  const typeName = workout?.workoutType?.name
  const avgPace =
    workout?.avgPace === undefined || workout?.avgPace === null
      ? '-'
      : workout?.avgPace
  const distance =
    workout.distance === undefined || workout.distance === null
      ? '-'
      : workout?.distance?.toFixed(1)
  const movingTime =
    workout?.movingTime === undefined ||
    workout?.movingTime === null ||
    workout?.movingTime === '0m 0s'
      ? '-'
      : workout.movingTime

  const updateVisible = () => {
    setIsVisible(prevVisible => !prevVisible)
  }

  return (
    <div
      className={c(css.wrapperCardWorkout, {
        [css.wrapperCardWorkoutBlack]: isToday && !isEmpty,
      })}
    >
      <div className={css.headerContainer}>
        <div className={css.header}>
          <div className={css.day}>
            {moment(workout.date)
              .format('dddd')
              .substr(0, 3)}
          </div>
          <div className={css.num}>{workout.date.split('-')[2]}</div>
        </div>
        <ScheduleTextPopover
          workout={workout}
          isVisible={isVisible}
          updateVisible={updateVisible}
        />
      </div>

      {isEmpty ? (
        <div className={css.emptyBody} onClick={setWorkout}>
          <PlusCircleOutlined className={css.iconAdd} />
          <div className={css.textAdd}>Add workout</div>
        </div>
      ) : (
        <div className={css.body} onClick={setWorkout}>
          {isPrevDay ? (
            <ListIcons workout={workout} showMark={false} showCopy={false} />
          ) : (
            <div className={css.hiddenText}>hidden</div>
          )}

          <div className={css.sectionType}>
            {workout.name ? (
              <div className={css.title}>{workout.name}</div>
            ) : (
              <div className={css.hiddenText}>hidden</div>
            )}
            <div className={css.type}>
              {typeName?.split(' ')?.length === 1 ? (
                <div className={css.label}>{typeName}</div>
              ) : (
                <div className={css.ellipsis}>
                  <Truncate lines={2}>{typeName}</Truncate>
                </div>
              )}
              {workout.workoutType && (
                <WorkoutType status={workout.status.statusId} />
              )}
            </div>
          </div>

          <Section
            title={workout?.time ? 'time' : 'distance'}
            blackText={
              workout?.time
                ? movingTime
                : workout.completedDistance
                  ? workout.completedDistance.toFixed(1)
                  : '–'
            }
            text={`/${workout?.time || distance}`}
            measurment={workout?.time ? '' : measurement === 1 ? 'mi' : 'km'}
            className={css.distance}
          />
          {workout?.avgPace ? (
            <Section
              title='average pace'
              text={`${avgPace}`}
              measurment={measurement === 1 ? '/mi' : '/km'}
            />
          ) : (
            <Section
              title='average pace'
              text={isPrevDay ? '0' : '-'}
              measurment={measurement === 1 ? '/mi' : '/km'}
            />
          )}
          <Section
            className={css.sectionNote}
            title='athlete notes'
            text={workout?.message?.text || '-'}
          />
        </div>
      )}
    </div>
  )
}

export default memo(Card)
