import { FEET_GET_QUESTIONS, FEET_GET_EVENT, FEET_GET_REGISTRATION, FEET_SET_WAIVER } from './feet-constants'

export const feetInitialState = {
  questions: [],
  event: {},
  user: {},
  waiver: '',
  token: '',
  userId: '',
}

export const feetReducers = (state = feetInitialState, { type, payload }) => {
  switch (type) {
  case FEET_GET_QUESTIONS:
    return { ...state, questions: payload?.surveyQuestions }
  case FEET_GET_EVENT:
    return { ...state, event: payload?.event }
  case FEET_GET_REGISTRATION:
    return { ...state, token: payload?.token, userId: payload?.userId, user: payload?.user }
  case FEET_SET_WAIVER:
    return { ...state, waiver: payload?.text }
  default:
    return state
  }
}
