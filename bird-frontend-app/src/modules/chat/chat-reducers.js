import {
  ADD_NEW_MESSAGE,
  CLEAR_CHAT,
  LIKE_WORKOUT,
  SET_ATHLETE,
  SET_MESSAGES,
  TOGGLE_CHAT,
  UPDATE_MESSAGE,
} from './chat-constants'

const initialState = {
  currentAthlete: {},
  isOpen: false,
  currentMessages: [],
}

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_ATHLETE:
    return {
      ...state,
      currentAthlete: { ...action.payload },
    }

  case TOGGLE_CHAT:
    return {
      ...state,
      isOpen: action.payload,
    }

  case SET_MESSAGES:
    return {
      ...state,
      currentMessages: [...action.payload],
    }

  case ADD_NEW_MESSAGE: {
    const newMessages = [...state.currentMessages]

    newMessages.unshift(action.payload)
    return {
      ...state,
      currentMessages: [...newMessages],
    }
  }

  case UPDATE_MESSAGE: {
    const oldMessages = [...state.currentMessages]
    const updatedMessages = oldMessages.map(message => {
      if (message.messageId === action.payload.messageId) {
        return {
          ...message,
          isDone: true,
        }
      }
      return message
    })
    return {
      ...state,
      currentMessages: updatedMessages,
    }
  }

  case LIKE_WORKOUT: {
    const currentMessages = [...state.currentMessages]
    const updatedMessages = currentMessages.map(message => {
      if (message.workout?.workoutId === action.payload) {
        return {
          ...message,
          workout: {
            ...message.workout,
            isLiked: !message.workout.isLiked,
          },
        }
      }
      return message
    })

    return {
      ...state,
      currentMessages: updatedMessages,
    }
  }

  case CLEAR_CHAT:
    return initialState

  default:
    return state
  }
}
