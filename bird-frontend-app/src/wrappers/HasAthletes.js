import React from 'react'
import { useSelector } from 'react-redux'

export const HasAthletes = ({ children }) => {
  const totalCount = useSelector(state => state.athlets.meta.totalCount)

  if (totalCount === 0) {
    return null
  }

  return children
}
