import React, { useState } from 'react'
import { Button, FormWorkout } from 'components'
import { Popover } from 'antd'
import css from './index.less'

const EmptyCard = ({ day = '', numDay = '', onSubmit = () => { } }) => {
  const [visible, setVisible] = useState(false)

  const updateVisible = () => setVisible(!visible)

  return (
    <div className={css.wrapperEmptyCard}>
      <div className={css.wrapperDay}>
        <div className={css.day}>{day}</div>
        <div className={css.numDay}>{numDay}</div>
      </div>

      <Popover
        trigger='click'
        content={
          <FormWorkout
            onSubmit={onSubmit}
            updateVisible={updateVisible}
          />
        }
        visible={visible}
        onVisibleChange={updateVisible}
        overlayClassName={css.popoverWorkout}
      >
        <Button btnText='add' className={css.button} />
      </Popover>
    </div>
  )
}

export default EmptyCard
