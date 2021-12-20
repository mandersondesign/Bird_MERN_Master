import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { copyWorkout, markWorkoutAsFavorite, unmarkWorkoutAsFavorite } from 'modules/athlets/athlets-actions'
import { likeWorkout, unlikeWorkout } from 'modules/workouts/workouts-actions'
import { Icon, DatePicker, ConfigProvider } from 'antd'
import { Tooltip, Button } from 'components'
import moment from 'moment'
import c from 'classnames'
import css from './index.less'

import en_GB from 'antd/lib/locale-provider/en_GB'

const ListIcons = ({ workout, showLike = true, showMark = true, showCopy = true }) => {
  const [isMark, setIsMark] = useState(workout?.isMarkedAsKey)
  const [isLike, setIsLike] = useState(workout?.isLiked)
  const [isCopy, setIsCopy] = useState(false)
  const { userId } = useSelector(state => state.athlets.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLike(workout?.isLiked)
  }, [workout?.isLiked])

  let dates = []

  const onChangeCopy = () => setIsCopy(!isCopy)
  const onChangeLike = () => setIsLike(!isLike)
  const onChangeMark = () => setIsMark(!isMark)

  const handlerCopy = () => {
    dispatch(copyWorkout(userId, workout.workoutId, { dates })).then(() => onChangeCopy())
  }

  const handlerMark = e => {
    e.stopPropagation()
    if (isMark) {
      dispatch(unmarkWorkoutAsFavorite(workout.workoutId, userId)).then(res => res && onChangeMark())
    } else {
      dispatch(markWorkoutAsFavorite(workout.workoutId, userId)).then(res => res && onChangeMark())
    }
  }

  const handlerLike = e => {
    e.stopPropagation()
    if (isLike) {
      dispatch(unlikeWorkout(workout?.workoutId, userId)).then(() => onChangeLike())
    } else {
      dispatch(likeWorkout(workout?.workoutId, userId)).then(() => onChangeLike())
    }
  }

  const onChangeDate = e => {
    const date = moment(e).format('YYYY-MM-DD')

    if (dates.find(i => i === date)) {
      dates = dates.filter(i => i !== date)
    } else {
      dates.push(date)
    }
  }

  const disabledDate = current => {
    const dateYear = moment(workout.date).add(1, 'year').format('YYYY-MM-DD')

    if (current) {
      return current < moment().subtract(1, 'days') || moment(current).isAfter(dateYear)
    }
  }

  return (
    <div className={css.icons}>
      {showMark && (
        <Tooltip
          title={isMark ? 'UNSELECT KEY WORKOUT' : 'SELECT KEY WORKOUT'} className={css.tooltip} content={(
            <Icon
              type='star'
              theme={isMark ? 'filled' : 'outlined'}
              twoToneColor='#f5e100'
              className={c(css.icon, css.iconStar, { [css.iconStarChoosed]: isMark })}
              onClick={handlerMark}
            />
          )}
        />
      )}

      {showLike && (
        <Tooltip
          title='LIKE' className={css.tooltip} content={(
            <Icon
              type='heart'
              theme={isLike ? 'filled' : 'outlined'}
              twoToneColor='#f5e100'
              className={c(css.icon, css.iconStar, { [css.iconStarChoosed]: isLike })}
              onClick={handlerLike}
            />
          )}
        />
      )}

      <ConfigProvider locale={en_GB}>
        <DatePicker
          open={isCopy}
          className={css.date}
          showToday={false}
          renderExtraFooter={() => (
            <div className={css.footerDatePicker}>
              <span className={css.clearBtn} onClick={() => setIsCopy(false)}>Cancel</span>
              <Button btnText='Copy' className={dates.length ? css.copyBtn : ''} disable={!dates.length} onClick={handlerCopy} />
            </div>
          )}
          onChange={onChangeDate}
          disabledDate={disabledDate}
          defaultValue={moment(workout.date)}
          dateRender={current => {
            const style = { backgroundColor: 'white' }

            if (dates.find(i => i === moment(current).format('YYYY-MM-DD'))) {
              style.backgroundColor = '#F2F600'
              style.borderRadius = '50%'
            }

            return (
              <div className='ant-calendar-date' style={style}>
                {current.date()}
              </div>
            )
          }}
        />
      </ConfigProvider>

      {showCopy && <Tooltip title='COPY' className={css.tooltip} content={<Icon type='copy' className={css.icon} onClick={handlerCopy} />} />}
    </div>
  )
}

export default ListIcons
