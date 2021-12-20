import { feet } from 'api'
import { FEET_GET_QUESTIONS, FEET_GET_EVENT, FEET_GET_REGISTRATION, FEET_SET_WAIVER } from './feet-constants'
import { loginFeet } from 'modules/session/session-actions'
import { showError } from 'utils'

export const getQuestionsAction = payload => ({ type: FEET_GET_QUESTIONS, payload })
export const getEventAction = payload => ({ type: FEET_GET_EVENT, payload })
export const registrationAction = payload => ({ type: FEET_GET_REGISTRATION, payload })
export const setWaiverAction = payload => ({ type: FEET_SET_WAIVER, payload })

export const login = data => dispatch => feet.login(data)
  .then(({ data }) => {
    dispatch(registrationAction(data))
    dispatch(loginFeet(data))
    return true
  })
  .catch(err => showError(err))

export const getQuestions = id => dispatch => feet.getQuestions(id)
  .then(({ data }) => dispatch(getQuestionsAction(data)))
  .catch(err => showError(err))

export const getEvent = id => dispatch => feet.getEvent(id)
  .then(({ data }) => dispatch(getEventAction(data)))
  .catch(err => showError(err))

export const getWaiver = id => {
  return dispatch => {
    feet.getWaiver(id)
      .then(({ data }) => {
        dispatch(setWaiverAction(data?.waiver))
      })
      .catch(err => showError(err))
  }
}

export const registration = data => dispatch => feet.registration(data)
  .then(({ data }) => {
    dispatch(registrationAction(data))
    dispatch(loginFeet(data))
    return true
  })
  .catch(err => showError(err))

export const accept = () => dispatch => feet.accept()
  .then(({ data }) => {})
  .catch(err => showError(err))

export const pay = token => dispatch => feet.pay(token)
  .then(({ data }) => {
    return data?.message === 'OK'
  })
  .catch(err => showError(err))
