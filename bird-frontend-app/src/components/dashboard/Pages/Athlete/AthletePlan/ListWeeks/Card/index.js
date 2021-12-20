import React, { useState } from 'react'
import { Tooltip, Button } from 'components'
import { Icon, Popconfirm, Popover, DatePicker, ConfigProvider } from 'antd'
import en_GB from 'antd/lib/locale-provider/en_GB'
import { useSelector, useDispatch } from 'react-redux'
import { delWorkout, copyWorkout } from 'modules/athlets/athlets-actions'
import moment from 'moment'
import FormWorkout from '../EmptyCard/FormWorkout'
import css from './index.less'
import c from 'classnames'

const Card = ({ workout, visibleDate, setDate, pacesWorkout, onFavoriteClick, favoriteCount }) => {
  const profileId = useSelector(state => state.athlets.profile.userId)
  const { measurement } = useSelector(state => state.session)
  const dispatch = useDispatch()
  const [visibleEdit, setVisibleEdit] = useState(false)
  const icons = [
    <div key='0' className={css.iconNoRes} />,
    <Icon key='1' type='check-circle' theme='filled' className={css.iconDone} />,
    <Icon key='2' type='stop' className={css.iconStop} />,
    <Icon key='3' type='check-circle' className={css.iconBlackRes} />,
  ]
  let dates = []
  const today = moment(Date.now()).format('YYYY-MM-DD')
  const day = workout?.date?.split('-')[2]
  const className = today === moment(workout.date).format('YYYY-MM-DD') ? css.todayHeader : css.header

  const deleteWorkout = () => dispatch(delWorkout(workout.workoutId, profileId))
  const setEdit = () => setVisibleEdit(!visibleEdit)
  const copy = () => {
    dispatch(copyWorkout(profileId, workout.workoutId, { dates }))
    setDate()
  }

  const footerDate = () => {
    return (
      <div className={css.footerDatePicker}>
        <span className={css.clearBtn} onClick={setDate}>Cancel</span>
        <Button btnText='Copy' className={dates.length ? css.copyBtn : ''} onClick={copy} disable={!dates.length} />
      </div>
    )
  }

  const disabledDate = current => {
    const dateYear = moment(workout.date).add(1, 'year').format('YYYY-MM-DD')

    if (current) {
      return current < moment().subtract(1, 'days') || moment(current).isAfter(dateYear)
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

  const onChangeStar = id => {
    onFavoriteClick(!workout?.isMarkedAsKey, id)
  }

  return (
    <div className={css.wrapperCard}>
      <div className={className}>
        <div className={css.day}>
          <span className={css.dayLabel}>{moment(workout.date).format('dddd').substr(0, 3)}</span>
          <span className={css.number}>{day}</span>
        </div>

        <div className={css.icons}>
          <Tooltip
            title={workout?.isMarkedAsKey ? 'UNSELECT KEY WORKOUT' : 'SELECT KEY WORKOUT'} content={(
              <Icon
                type='star'
                theme={workout?.isMarkedAsKey ? 'filled' : 'outlined'}
                twoToneColor='#f5e100'
                className={c(css.icon, css.iconStar, { [css.iconStarChoosed]: workout?.isMarkedAsKey })}
                onClick={() => onChangeStar(workout.workoutId)}
              />
            )}
          />
          <Tooltip
            title='EDIT' content={(
              <Popover
                trigger='click'
                content={<FormWorkout workout={workout} setEdit={setEdit} />}
                visible={visibleEdit}
                onVisibleChange={setEdit}
                overlayClassName={css.popoverWorkout}
              >
                <Icon type='edit' className={css.icon} />
              </Popover>
            )}
          />

          <Tooltip
            title='COPY' content={(
              <Icon type='copy' className={css.icon} onClick={() => setDate(workout.workoutId)} />
            )}
          />

          <ConfigProvider locale={en_GB}>
            <DatePicker
              open={visibleDate.id === workout.workoutId && visibleDate.display}
              className={css.date}
              showToday={false}
              renderExtraFooter={footerDate}
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

          <Tooltip
            title='DELETE' content={(
              <Popconfirm
                title='Are you sure you want to delete this workout?'
                onConfirm={deleteWorkout}
                okText='Yes'
                cancelText='No'
              >
                <Icon type='delete' className={css.icon} />
              </Popconfirm>
            )}
          />
        </div>
      </div>
      <div className={css.body}>
        <div className={css.wrapperType}>
          <span className={css.title}>{workout.name}</span>
          <div className={css.blockType}>
            <span className={css.label}>{workout.workoutType.name}</span>
            {workout.workoutType && icons[workout.status.statusId - 1]}
          </div>
        </div>

        <div className={css.wrapperType}>
          <div className={css.blockType}>
            <span className={css.labelDistance}>{workout.distance}</span>
            <span className={css.milles}>{measurement === 1 ? 'mi' : 'km'}</span>
          </div>
        </div>

        {workout?.message?.text ? (
          <div className={css.wrapperType}>
            <span className={css.title}>athlete notes</span>
            <p className={css.textNotes}>{workout?.message?.text}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Card
