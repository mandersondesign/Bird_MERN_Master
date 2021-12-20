import { USERS_START, USERS_SUBMIT, USERS_SUBMIT_FAILURE, USERS_SUBMIT_SUCCESS, USERS_UPDATE } from './users-constants'

export const loginStart = () => ({
  type: USERS_START,
})

export const loginUpdateAction = payload => ({
  type: USERS_UPDATE,
  payload,
})

export const loginSubmitAction = payload => ({
  type: USERS_SUBMIT,
  payload,
})

export const loginSubmitSuccessAction = () => ({
  type: USERS_SUBMIT_SUCCESS,
})

export const loginSubmitFailureAction = error => ({
  type: USERS_SUBMIT_FAILURE,
  payload: error,
})

export const login = () => (dispatch, getState) => {
  const { login } = getState()

  if (login.busy) {
    return Promise.resolve()
  }

  dispatch(loginStart())
}
