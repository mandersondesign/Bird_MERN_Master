import {
  LOGOUT,
  SESSION_UPDATE,
  LOG_AS_COACH,
  USERS_GET_USER,
  COACHES_GET_CARDS,
  UPDATE_USER_AVATAR,
  GET_MEASUREMENT,
  GET_CUSTOM_QUESTIONS,
} from './session-constants'

export const sessionInitialState = {
  user: null,
  token: null,
  stripeCards: [],
  questions: [],
  measurement: 1,
}

export const sessionReducer = (state = sessionInitialState, action) => {
  const { type, payload } = action
  switch (type) {
  case SESSION_UPDATE: {
    return payload
  }
  case LOGOUT: {
    return sessionInitialState
  }
  case LOG_AS_COACH: {
    return { ...state, token: payload.token, user: payload.user }
  }
  case COACHES_GET_CARDS: {
    return { ...state, stripeCards: payload.stripeCards }
  }
  case USERS_GET_USER: {
    return { ...state, user: payload.data.user }
  }
  case UPDATE_USER_AVATAR: {
    return { ...state, user: { ...state.user, avatar: payload?.avatar, loading: payload?.loading } }
  }
  case GET_MEASUREMENT: {
    return { ...state, measurement: payload.user.measurementId || 1 }
  }
  case GET_CUSTOM_QUESTIONS: {
    return { ...state, questions: payload || 1 }
  }
  default: {
    return state
  }
  }
}
