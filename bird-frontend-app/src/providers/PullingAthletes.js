import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sessionSelector } from 'modules/session/session-selectors'
import { coaches } from 'api'
import { setAllAthletes, sortAllAthletes } from 'modules/page/page-actions'
import { pageSelector } from 'modules/page/page-selectors'
import { loadingPageAthletes } from '../modules/page/page-actions'

export const PullingContext = createContext({})

export const PullingAthletes = ({ children }) => {
  const [currentInterval, setCurrentInterval] = useState()
  const { currentSortType } = useSelector(pageSelector)
  const { token } = useSelector(sessionSelector)
  const dispatch = useDispatch()

  const pullingAthletes = async () => {
    const sortType =
      Object.keys(currentSortType).length === 0
        ? {
          name: 'messages',
          direction: 'desc',
        }
        : currentSortType

    dispatch(loadingPageAthletes(true))
    const {
      data: { athletes },
    } = await coaches.listAllAthletes()
    const newAthletes = athletes.map(athlete => ({
      ...athlete,
      hasNewMessage:
        athlete?.lastMessage?.text !== '' &&
        athlete?.lastMessage?.readDate === null,
    }))
    dispatch(setAllAthletes(newAthletes))
    dispatch(sortAllAthletes(sortType))
    dispatch(loadingPageAthletes(false))
  }

  useEffect(() => {
    if (token) {
      if (currentInterval) clearInterval(currentInterval)
      pullingAthletes()
      const newInterval = setInterval(() => pullingAthletes(), 1000 * 60 * 5)
      setCurrentInterval(newInterval)
    }
    return () => {
      clearInterval(currentInterval)
    }
  }, [token])

  return (
    <PullingContext.Provider
      value={{
        pullingAthletes,
      }}
    >
      {children}
    </PullingContext.Provider>
  )
}
