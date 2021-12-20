import React from 'react'
import moment from 'moment'
import {
  ActivityContainer,
  ActivityColumn,
  ActivityDay,
  ActivityNumber,
  WorkoutName,
  WorkoutStatus,
  ReActionRow,
  LoveIcon,
  LoveLabel,
  FilledLoveIcon,
} from './styled'
import StatusIcon from '../Workouts/IconType'
import { Grid } from '@material-ui/core'

const ActivitySummary = ({
  isLiked,
  isChat,
  alignHeart,
  lastActivity,
  lastActivityWorkout,
  toggleWorkout,
  onNavigateWorkout,
}) => {
  return (
    <ActivityContainer>
      <ActivityColumn onClick={onNavigateWorkout} marginRight='8px'>
        <ActivityDay>{moment(lastActivity).format('ddd')}</ActivityDay>
        <ActivityNumber>{moment(lastActivity).format('D')}</ActivityNumber>
      </ActivityColumn>
      {lastActivityWorkout && lastActivityWorkout?.status?.statusId > 1 ? (
        <Grid container item>
          <ActivityColumn
            onClick={onNavigateWorkout}
            justifyContent='space-between'
            marginRight='22px'
          >
            <ActivityDay>{lastActivityWorkout?.workoutType?.name}</ActivityDay>
            <WorkoutStatus>
              <StatusIcon status={lastActivityWorkout?.status?.statusId} />
              <WorkoutName>{lastActivityWorkout?.name}</WorkoutName>
            </WorkoutStatus>
          </ActivityColumn>
          <ReActionRow alignitems={alignHeart}>
            {lastActivityWorkout?.isLiked ? (
              <FilledLoveIcon onClick={toggleWorkout} />
            ) : (
              <LoveIcon onClick={toggleWorkout} />
            )}
            {isChat && <LoveLabel>LIKE</LoveLabel>}
          </ReActionRow>
        </Grid>
      ) : null}
    </ActivityContainer>
  )
}

export default ActivitySummary
