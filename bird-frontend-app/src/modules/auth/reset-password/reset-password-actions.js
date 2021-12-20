import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUBMIT,
  RESET_PASSWORD_SUBMIT_FAILURE,
  RESET_PASSWORD_SUBMIT_SUCCESS,
  RESET_PASSWORD_UPDATE,
} from './reset-password-constants'

export const resetPasswordStart = () => ({
  type: RESET_PASSWORD_START,
})

export const resetPasswordUpdateAction = payload => ({
  type: RESET_PASSWORD_UPDATE,
  payload,
})

export const resetPasswordSubmitAction = payload => ({
  type: RESET_PASSWORD_SUBMIT,
  payload,
})

export const loginSubmitSuccessAction = () => ({
  type: RESET_PASSWORD_SUBMIT_SUCCESS,
})

export const loginSubmitFailureAction = error => ({
  type: RESET_PASSWORD_SUBMIT_FAILURE,
  payload: error,
})

export const resetPassword = () => (dispatch, getState) => {
  const { resetPassword } = getState()

  if (resetPassword.busy) {
    return Promise.resolve()
  }

  dispatch(resetPasswordStart())
}
