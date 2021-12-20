import { useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { messages } from 'api'

import { sessionSelector } from 'modules/session/session-selectors'
import { chatSelector } from 'modules/chat/chat-selectors'
import { addNewMessage, updateMessage } from 'modules/chat/chat-actions'

export const useChat = () => {
  const dispatch = useDispatch()
  const { currentAthlete } = useSelector(chatSelector)
  const loggedCoach = useSelector(sessionSelector)
  const [message, setMessage] = useState('')

  const onInputChange = e => {
    setMessage(e.target.value)
  }

  const updateUserMessages = newMessage => {
    const newUserMessage = {
      text: newMessage.message,
      date: moment().format(),
      isFromAthlete: !newMessage.isSentByCoach,
      isDone: false,
    }
    dispatch(addNewMessage(newUserMessage))
  }

  const handleResponse = response => {
    if (response.data.success) {
      dispatch(updateMessage(message))
    }
  }

  const onMessageSend = async () => {
    const newMessage = {
      message,
      userIdFrom: loggedCoach.user.userId,
      userIdTo: currentAthlete.userId,
      isSentByCoach: true,
    }
    updateUserMessages(newMessage)
    setMessage('')
    try {
      const response = await messages.sendDM(newMessage)
      handleResponse(response, message)
    } catch (error) {
      // Handle Errors here
    }
  }

  return {
    message,
    onMessageSend,
    onInputChange,
    setMessage,
  }
}
