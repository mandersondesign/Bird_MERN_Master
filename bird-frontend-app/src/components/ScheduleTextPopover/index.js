import React, { useState } from 'react'
import { Popover } from 'antd'
import { Tooltip } from 'components'
import moment from 'moment'
import { getContent, getIcons } from './utils'

export const ScheduleTextPopover = ({
  workout,
  isVisible,
  updateVisible,
  isTemplate,
}) => {
  const [hover, setHover] = useState(false)
  const [hasMessage, setHasMessage] = useState(
    workout?.scheduledMessage && workout?.scheduledMessage !== '',
  )
  const isToday = !isTemplate && moment(workout.date).isSame(Date.now(), 'day')
  const isTodayOrBefore =
    !isTemplate && moment(workout.date).isSameOrBefore(Date.now(), 'day')

  const icons = getIcons({
    isTemplate,
    hasMessage,
    setHover,
    hover,
    isToday,
    isTodayOrBefore,
  })

  const content = getContent({
    isTemplate,
    workout,
    updateVisible,
    setHasMessage,
  })

  return (
    <Popover
      trigger='click'
      content={content}
      visible={isVisible}
      onVisibleChange={updateVisible}
    >
      <Tooltip content={icons} />
    </Popover>
  )
}
