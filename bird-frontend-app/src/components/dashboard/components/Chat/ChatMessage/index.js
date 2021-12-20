import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { sessionSelector } from 'modules/session/session-selectors'
import { chatSelector } from 'modules/chat/chat-selectors'

import {
  Message,
  MessageContainer,
  Sender,
  Date,
  SentIcon,
  ReceivedIcon,
  DateContainer,
  MessageBox,
} from './chat-message-styled'
import { LastActivity } from './LastActivity'

export const ChatMessage = ({ message, showDate }) => {
  const {
    currentAthlete: { name },
  } = useSelector(chatSelector)
  const loggedCoach = useSelector(sessionSelector)
  const { isFromAthlete, isPlanMessage, text, date, isLiked, isDone } = message
  return (
    <MessageContainer isFromAthlete={isFromAthlete}>
      <Sender>{isFromAthlete ? name : loggedCoach.user.name}</Sender>
      <MessageBox>
        {isPlanMessage ? <LastActivity isLiked={isLiked} /> : null}
        <Message isPlanMessage={isPlanMessage}>{text}</Message>
        {isDone ? <ReceivedIcon /> : <SentIcon />}
      </MessageBox>

      <DateContainer>
        {showDate ? (
          <Date>{moment(date).format('MM/DD/YYYY, HH:mm A')}</Date>
        ) : null}
      </DateContainer>
    </MessageContainer>
  )
}
