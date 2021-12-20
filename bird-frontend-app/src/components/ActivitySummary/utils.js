import React from 'react'
import {
  Completed,
  NoResults,
  PartiallyCompleted,
  NotCompleted,
} from './styled'

export const getStatusIcon = status => {
  switch (status) {
  case 1:
    return <NoResults />
  case 2:
    return <Completed />
  case 3:
    return <NotCompleted />
  case 4:
    return <PartiallyCompleted />
  default:
    break
  }
}
