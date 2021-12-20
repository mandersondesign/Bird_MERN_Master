import { LOGIN_START, LOGIN_SUBMIT, LOGIN_SUBMIT_FAILURE, LOGIN_SUBMIT_SUCCESS, LOGIN_UPDATE } from '../login/login-constants'

export const loginInitialState = {
  user: '',
  password: '',
  busy: false,
}

export const loginReducer = (state = loginInitialState, { type, payload }) => {
  switch (type) {
  case LOGIN_START:
    return { ...state, busy: true }
  case LOGIN_UPDATE:
    return payload
  case LOGIN_SUBMIT:
    return payload
  case LOGIN_SUBMIT_SUCCESS:
    return state
  case LOGIN_SUBMIT_FAILURE:
    return payload
  default:
    return state
  }
}
