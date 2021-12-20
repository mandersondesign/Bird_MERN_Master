import React, { useState } from 'react'
import { Button } from 'components'
import moment from 'moment'
import { Popover } from 'antd'
import FormWorkout from './FormWorkout'
import css from './index.less'

const EmptyCard = ({ workout }) => {
  const [visible, setVisible] = useState(false)
  const updateVisible = () => setVisible(!visible)

  return (
    <div className={css.emptyWorkout}>
      <div className={css.wrapperDate}>
        <div className={css.block}>
          <span className={css.date}>{moment(workout.date).format('dddd').substr(0, 3)}</span>
          <span className={css.day}>{workout.date.split('-')[2]}</span>
        </div>
      </div>
      <Popover
        trigger='click'
        content={<FormWorkout workout={workout} updateVisible={updateVisible} />}
        visible={visible}
        onVisibleChange={updateVisible}
        overlayClassName={css.popoverWorkout}
      >
        <Button
          btnText='add'
          className={css.button}
        />
      </Popover>
    </div>
  )
}

export default EmptyCard
