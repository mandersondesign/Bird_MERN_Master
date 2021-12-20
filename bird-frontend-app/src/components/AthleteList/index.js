import { LinearProgress } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AthleteCard } from '..'
import { toggleChat } from 'modules/chat/chat-actions'

const AthleteList = ({ athleteList, loading }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const navigateToPlan = athleteId => {
    history.push(`/athletes/${athleteId}/plan`)
    dispatch(toggleChat(false))
  }

  const navigateWorkout = athleteId => {
    history.push(`/athletes/${athleteId}/plan`)
    dispatch(toggleChat(false))
  }

  if (loading) return <LinearProgress style={{ flex: 1 }} />

  return athleteList.map((athlete, index) => (
    <AthleteCard
      key={index.toString()}
      athlete={athlete}
      onNavigatePlan={navigateToPlan}
      onNavigateWorkout={navigateWorkout}
    />
  ))
}

export default AthleteList
