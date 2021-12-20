import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import StatusIcon from 'components/Workouts/IconType'
import { workouts } from 'api'
import { toggleAthleteWorkout } from 'modules/page/page-actions'
import { likeWorkout } from 'modules/chat/chat-actions'

import {
  ActivityContainer,
  DateColumn,
  WorkoutTypeColumn,
  DateLabel,
  DateNumber,
  TypeName,
  StatusRow,
  StatusName,
  FilledLoveIcon,
  LoveIcon,
  Row,
} from './chat-box-styled'

const WorkoutBox = ({ workout }) => {
  const dispatch = useDispatch()

  const toggleWorkout = async () => {
    dispatch(toggleAthleteWorkout(workout?.workoutId))
    dispatch(likeWorkout(workout?.workoutId))
    try {
      if (workout?.isLiked) {
        await workouts.unlikeWorkout(workout?.workoutId)
      } else {
        await workouts.likeWorkout(workout?.workoutId)
      }
    } catch (error) {
      dispatch(toggleAthleteWorkout(workout?.workoutId))
      dispatch(likeWorkout(workout?.workoutId))
    }
  }
  return (
    <ActivityContainer>
      <DateColumn>
        <DateLabel>{moment(workout?.date).format('ddd')}</DateLabel>
        <DateNumber>{moment(workout?.date).format('D')}</DateNumber>
      </DateColumn>
      <WorkoutTypeColumn>
        <TypeName>{workout?.name}</TypeName>
        <StatusRow>
          <Row>
            <StatusIcon status={workout?.workoutStatusId} />
            <StatusName>{workout?.workoutType?.name}</StatusName>
          </Row>
          {workout?.isLiked ? (
            <FilledLoveIcon onClick={toggleWorkout} />
          ) : (
            <LoveIcon onClick={toggleWorkout} />
          )}
        </StatusRow>
      </WorkoutTypeColumn>
    </ActivityContainer>
  )
}

export default WorkoutBox
