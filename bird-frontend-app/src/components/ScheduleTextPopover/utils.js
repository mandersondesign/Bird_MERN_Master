import React from 'react'
import { IconChat, IconChatFilled } from './styled'
import { WorkoutTemplate } from './WorkoutTemplate'
import { ActiveWorkout } from './ActiveWorkout'

export const getIcons = ({
  isTemplate,
  hasMessage,
  setHover,
  hover,
  isToday,
  isTodayOrBefore,
}) => {
  if (isTemplate && !hasMessage) {
    return (
      <IconChat
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        hover={hover}
        isToday={isToday}
      />
    )
  }
  if (isTemplate && hasMessage) {
    return (
      <IconChatFilled
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        hover={hover}
        isToday={isToday}
      />
    )
  }

  if (!isTemplate && hasMessage) {
    return (
      <IconChatFilled
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        hover={hover}
        isToday={isToday}
      />
    )
  }

  if (!isTemplate && !hasMessage && !isTodayOrBefore) {
    return (
      <IconChat
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        hover={hover}
        isToday={isToday}
      />
    )
  }

  if (!isTemplate && !hasMessage && isTodayOrBefore) return null
}

export const getContent = ({
  isTemplate,
  workout,
  updateVisible,
  setHasMessage,
}) => {
  if (isTemplate) {
    return (
      <WorkoutTemplate
        isTemplate={isTemplate}
        workout={workout}
        onClose={updateVisible}
        setHasMessage={setHasMessage}
      />
    )
  }

  return (
    <ActiveWorkout
      isTemplate={isTemplate}
      workout={workout}
      onClose={updateVisible}
      setHasMessage={setHasMessage}
    />
  )
}
