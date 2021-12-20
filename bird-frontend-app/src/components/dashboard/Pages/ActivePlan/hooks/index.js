import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { sessionSelector } from 'modules/session/session-selectors'
import {
  shiftMessagedAthlete,
  setPageAthletes,
  sortAthletes,
} from 'modules/page/page-actions'
import { pageSelector } from 'modules/page/page-selectors'

import { SocketContext } from '../../../../../providers/SocketProvider'

export const useActiveAthletes = () => {
  const dispatch = useDispatch()

  const params = useParams()
  const { socket } = useContext(SocketContext)
  const { currentSortType, allAthletes } = useSelector(pageSelector)
  const {
    user: { userId },
  } = useSelector(sessionSelector)

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
  const getFromPlanTemplate = planTemplateId => {
    const planAthletes = [...allAthletes].filter(
      athlete =>
        athlete?.plan &&
        athlete.plan.isActive &&
        athlete?.plan?.planTemplateId === planTemplateId,
    )
    return planAthletes
  }

  const getActiveAthletes = () => {
    const activeAthletes = [...allAthletes].filter(
      athlete => athlete?.plan && athlete.plan.isActive,
    )
    return activeAthletes
  }

  useEffect(() => {
    if (socket) socket.on('new_message', updateAthletes)
    return () => {
      if (socket) socket.off('new_mesage', updateAthletes)
    }
  }, [socket, currentSortType])

  useEffect(() => {
    const planTemplateId = parseInt(params?.planTemplateId)

    if (planTemplateId > 0) {
      const planAthletes = getFromPlanTemplate(planTemplateId)
      dispatch(setPageAthletes(planAthletes))
      dispatch(sortAthletes(currentSortType))
    }
    if (planTemplateId === 0) {
      const activeAthletes = getActiveAthletes()
      dispatch(setPageAthletes(activeAthletes))
      dispatch(sortAthletes(currentSortType))
    }
  }, [allAthletes, params])
}
