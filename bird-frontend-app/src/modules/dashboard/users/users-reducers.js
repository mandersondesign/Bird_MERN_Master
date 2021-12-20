import { USERS_START, USERS_SUBMIT, USERS_SUBMIT_FAILURE, USERS_SUBMIT_SUCCESS, USERS_UPDATE } from './users-constants'

export const loginInitialState = {
  user: '',
  password: '',
  busy: false,
}

export const loginReducer = (state = loginInitialState, { type, payload }) => {
  switch (type) {
    case USERS_START:
      return { ...state, busy: true }
    case USERS_UPDATE:
      return payload
    case USERS_SUBMIT:
      return payload
    case USERS_SUBMIT_SUCCESS:
      return state
    case USERS_SUBMIT_FAILURE:
      return payload
    default:
      return state
  }
}
