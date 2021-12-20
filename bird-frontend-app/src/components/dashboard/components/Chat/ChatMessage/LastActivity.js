import React from 'react'
import {
  ActivityContainer,
  ActivityColumn,
  ActivityDay,
  ActivityNumber,
  Benchmark,
  BenchmarkRow,
  CircleCheck,
  ReActionRow,
  LoveIcon,
  LoveLabel,
  FilledLoveIcon,
} from './chat-message-styled'

export const LastActivity = ({ isLiked }) => {
  return (
    <ActivityContainer>
      <ActivityColumn marginRight='8px'>
        <ActivityDay>MON</ActivityDay>
        <ActivityNumber>9</ActivityNumber>
      </ActivityColumn>
      <ActivityColumn justifyContent='space-between'>
        <ActivityDay>RUN</ActivityDay>
        <BenchmarkRow>
          <CircleCheck />
          <Benchmark>Benchmark</Benchmark>
        </BenchmarkRow>
      </ActivityColumn>
      <ReActionRow>
        {isLiked ? <FilledLoveIcon /> : <LoveIcon />}
        <LoveLabel>Like</LoveLabel>
      </ReActionRow>
    </ActivityContainer>
  )
}
