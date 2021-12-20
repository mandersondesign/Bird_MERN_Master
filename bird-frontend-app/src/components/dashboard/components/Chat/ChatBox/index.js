import React from 'react'

import { ChatMessage } from '../ChatMessage'
import { Container, Loading } from './chat-box-styled'
import WorkoutBox from './WorkoutBox'

export const ChatBox = ({ weeklyMessages, isLoadingMessages }) => {
  if (isLoadingMessages) {
    return (
      <Container isLoadingMessages>
        <Loading />
      </Container>
    )
  }
  return (
    <Container>
      {weeklyMessages.map(week => {
        return week.map((message, index) => {
          return (
            <>
              <ChatMessage
                key={index.toString()}
                message={message}
                showDate={index === 0}
              />
              {message?.workout ? (
                <WorkoutBox
                  key={message?.workout?.workoutId}
                  workout={message?.workout}
                />
              ) : null}
            </>
          )
        })
      })}
    </Container>
  )
}
