import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sessionSelector } from 'modules/session/session-selectors'
import {
  setPageAthletes,
  sortAthletes,
  shiftMessagedAthlete,
} from 'modules/page/page-actions'
import { pageSelector } from 'modules/page/page-selectors'

import { SocketContext } from '../../../../../providers/SocketProvider'

export const useAllAthletes = () => {
  const dispatch = useDispatch()
  const { socket } = useContext(SocketContext)
  const { currentSortType } = useSelector(pageSelector)
  const {
    user: { userId },
  } = useSelector(sessionSelector)
  const { allAthletes } = useSelector(pageSelector)

  const updateAthletes = message => {
    if (
      message.type === 'msg' &&
      message.to === userId &&
      currentSortType?.name === 'messages'
    ) {
      dispatch(shiftMessagedAthlete(message))
    }
    if (
      message.type === 'msg' &&
      message.to === userId &&
      currentSortType?.name === 'activity' &&
      message.plan
    ) {
      dispatch(shiftMessagedAthlete(message))
    }
  }

  useEffect(() => {
    if (socket) socket.on('new_message', updateAthletes)
    return () => {
      if (socket) socket.off('new_mesage', updateAthletes)
    }
  }, [socket, currentSortType])

  useEffect(() => {
    if (allAthletes) {
      dispatch(setPageAthletes(allAthletes))
      dispatch(sortAthletes(currentSortType))
    }
  }, [allAthletes])

  useEffect(() => {
    if (window.location.pathname === '/athletes/unassigned') {
      const unassignedAthletes = [...allAthletes].filter(
        athlete => !athlete?.plan || !athlete.plan.isActive,
      )
      dispatch(setPageAthletes(unassignedAthletes))
      dispatch(sortAthletes(currentSortType))
    }
  }, [window.location])
}
