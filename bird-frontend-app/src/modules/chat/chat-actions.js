import {
  ADD_NEW_MESSAGE,
  CLEAR_CHAT,
  LIKE_WORKOUT,
  SET_ATHLETE,
  SET_MESSAGES,
  TOGGLE_CHAT,
  UPDATE_MESSAGE,
} from './chat-constants'

export const setAthlete = athlete => {
  return {
    type: SET_ATHLETE,
    payload: athlete,
  }
}

export const toggleChat = value => {
  return {
    type: TOGGLE_CHAT,
    payload: value,
  }
}

export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  }
}

export const addNewMessage = message => {
  return {
    type: ADD_NEW_MESSAGE,
    payload: message,
  }
}

export const updateMessage = message => {
  return {
    type: UPDATE_MESSAGE,
    payload: message,
  }
}

export const clearChat = () => {
  return {
    type: CLEAR_CHAT,
  }
}

export const likeWorkout = workoutId => {
  return {
    type: LIKE_WORKOUT,
    payload: workoutId,
  }
}
