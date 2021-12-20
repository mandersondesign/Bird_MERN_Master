import React from 'react'
import { useDispatch } from 'react-redux'
import { setAthlete, toggleChat, likeWorkout } from 'modules/chat/chat-actions'
import { readNewMessage, toggleAthleteWorkout } from 'modules/page/page-actions'
import { ActivitySummary } from '..'
import {
  CardContainer,
  Circle,
  FullName,
  Image,
  NameContainer,
  PlanName,
  CardSection,
  LastMessage,
} from './styled'
import { workouts, messages } from 'api'

const AthleteCard = ({ athlete, onNavigatePlan, onNavigateWorkout }) => {
  const dispatch = useDispatch()

  const replyAthlete = () => {
    dispatch(setAthlete(athlete))
    dispatch(toggleChat(true))
    dispatch(readNewMessage(athlete?.userId))

    if (athlete?.lastMessage?.messageId) {
      messages.readMessage({
        messageIds: [athlete?.lastMessage?.messageId],
      })
    }
  }
  const toggleWorkout = async () => {
    dispatch(toggleAthleteWorkout(athlete?.lastActivityWorkout?.workoutId))
    dispatch(likeWorkout(athlete?.lastActivityWorkout?.workoutId))
    try {
      if (athlete?.lastActivityWorkout?.isLiked) {
        await workouts.unlikeWorkout(athlete?.lastActivityWorkout?.workoutId)
      } else {
        await workouts.likeWorkout(athlete?.lastActivityWorkout?.workoutId)
      }
    } catch (error) {
      dispatch(toggleAthleteWorkout(athlete?.lastActivityWorkout?.workoutId))
      dispatch(likeWorkout(athlete?.lastActivityWorkout?.workoutId))
    }
  }

  return (
    <CardContainer container>
      <CardSection paddingleft='16px' container item xs={4}>
        <Circle hasnewmessage={athlete?.hasNewMessage} />
        <Image
          src={athlete?.avatar}
          onClick={() => onNavigatePlan(athlete?.userId)}
        />
        <NameContainer>
          <FullName onClick={() => onNavigatePlan(athlete?.userId)}>
            {athlete?.name}
          </FullName>
          <PlanName onClick={() => onNavigatePlan(athlete?.userId)}>
            {athlete?.plan?.name}
          </PlanName>
        </NameContainer>
      </CardSection>
      <CardSection container item xs={3}>
        <ActivitySummary
          alignHeart='flex-end'
          lastActivity={athlete?.lastActivity}
          lastActivityWorkout={athlete?.lastActivityWorkout}
          toggleWorkout={toggleWorkout}
          onNavigateWorkout={() => onNavigateWorkout(athlete?.userId)}
        />
      </CardSection>
      <CardSection container item xs={4} onClick={replyAthlete}>
        <LastMessage>{athlete?.lastMessage?.text}</LastMessage>
      </CardSection>
    </CardContainer>
  )
}

export default AthleteCard
