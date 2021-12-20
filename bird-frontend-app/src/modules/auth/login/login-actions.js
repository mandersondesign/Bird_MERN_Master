import { LOGIN_START, LOGIN_SUBMIT, LOGIN_SUBMIT_FAILURE, LOGIN_SUBMIT_SUCCESS, LOGIN_UPDATE } from './login-constants'
import { auth } from 'api'

export const loginStart = () => ({
  type: LOGIN_START,
})

export const loginUpdateAction = payload => ({
  type: LOGIN_UPDATE,
  payload,
})

export const loginSubmitAction = payload => ({
  type: LOGIN_SUBMIT,
  payload,
})

export const loginSubmitSuccessAction = () => ({
  type: LOGIN_SUBMIT_SUCCESS,
})

export const loginSubmitFailureAction = error => ({
  type: LOGIN_SUBMIT_FAILURE,
  payload: error,
})

export const login = data => (dispatch, getState) => auth.login(data).then(() => {
  const { login } = getState()

  if (login.busy) {
    return Promise.resolve()
  }
  dispatch(loginStart(data))
})
