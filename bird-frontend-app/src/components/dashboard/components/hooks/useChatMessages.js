import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { messages, workouts } from 'api'
import { chatSelector } from 'modules/chat/chat-selectors'
import { setMessages, addNewMessage } from 'modules/chat/chat-actions'

import { sortMessages, getMessagesByWeek, inserWorkout } from '../utils'
import { SocketContext } from '../../../../providers/SocketProvider'

export const useChatMessages = () => {
  const dispatch = useDispatch()
  const { socket } = useContext(SocketContext)
  const {
    currentAthlete: { userId },
    isOpen,
    currentMessages,
  } = useSelector(chatSelector)
  const [weeklyMessages, setWeeklyMessages] = useState([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)

  useEffect(() => {
    const updateMessages = message => {
      if (
        message.type === 'msg' &&
        (message.from === userId || message.to === userId)
      ) {
        const newMessage = {
          text: message.msg,
          date: moment().format(),
          isFromAthlete: !message.isFromCoach,
          isDone: true,
        }
        dispatch(addNewMessage(newMessage))
      }
    }
    if (socket) socket.on('new_message', updateMessages)
    return () => {
      if (socket) socket.off('new_message', updateMessages)
    }
  }, [userId, isOpen, socket])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await workouts.getWorkoutById(userId)
      const athleteWorkouts = response.data.workouts
      return athleteWorkouts
    }
    const fetchAthleteMessages = async () => {
      const response = await messages.getUserMessages({ userId: userId })
      const athleteWorkouts = await fetchWorkouts()
      const sortedMessages = sortMessages(
        response.data.messages.filter(msg => msg.text !== ''),
      )
      const messagesWithWorkouts = inserWorkout(sortedMessages, athleteWorkouts)
      dispatch(setMessages(messagesWithWorkouts))
    }

    if ((userId, isOpen)) {
      setIsLoadingMessages(true)
      fetchAthleteMessages()
      setIsLoadingMessages(false)
    }
  }, [userId, isOpen])

  useEffect(() => {
    const messagesByWeek = getMessagesByWeek(currentMessages)
    setWeeklyMessages(messagesByWeek)
  }, [currentMessages])

  return {
    weeklyMessages,
    isLoadingMessages,
  }
}
