import { auth, users, coaches } from 'api'
import { notification } from 'antd'
import {
  LOGOUT,
  SESSION_UPDATE,
  LOG_AS_COACH,
  USERS_GET_USER,
  COACHES_GET_CARDS,
  GET_MEASUREMENT,
  GET_CUSTOM_QUESTIONS,
} from './session-constants'
import { resetPlanOfAthlete } from 'modules/athlets/athlets-actions'
import { push } from 'modules/router'
import { resetPageAthletes } from '../page/page-actions'

const msgError = error => {
  const message = error?.response?.data?.error
  notification.error({ message: message || '' })
}

export const logoutAction = () => ({ type: LOGOUT })

export const sessionUpdateAction = data => ({
  type: SESSION_UPDATE,
  payload: data,
})

export const sessionGetCards = data => ({
  type: COACHES_GET_CARDS,
  payload: data,
})

export const logCoach = payload => ({ type: LOG_AS_COACH, payload })

export const getUserAction = payload => ({ type: USERS_GET_USER, payload })

export const getMeasurementAction = payload => ({
  type: GET_MEASUREMENT,
  payload,
})

export const getCustomQuestionsAction = payload => ({
  type: GET_CUSTOM_QUESTIONS,
  payload,
})

export const logout = () => async dispatch => {
  let err = null
  let response

  try {
    response = await auth.logout()
    dispatch(resetPlanOfAthlete())
    dispatch(resetPageAthletes())
  } catch (e) {
    err = e
  }
  dispatch(logoutAction())

  if (err) {
    return Promise.reject(err)
  }

  push('/')
  return Promise.resolve(response)
}

export const login = data => async dispatch => {
  try {
    const response = await auth.login(data)

    await dispatch(sessionUpdateAction(response))
    return Promise.resolve(response)
  } catch (e) {
    return Promise.reject(e)
  }
}

export const logAsCoach = id => async dispatch => {
  const { data } = await auth.logAsCoach(id)

  await dispatch(logCoach(data))
  await dispatch(getCurrentUser(data.token)).then(({ data }) => {
    dispatch(getMeasurement()).then(() => {})
  })
}

export const loginFeet = data => dispatch => {
  dispatch(logCoach(data))
}

export const getMeasurement = () => dispatch =>
  coaches
    .getMeasurement()
    .then(({ data }) => dispatch(getMeasurementAction(data?.data)))
    .catch(error => msgError(error))

export const updateMeasurement = (id, data) => dispatch =>
  coaches
    .updateMeasurement(id, data)
    .then(() => dispatch(getMeasurement()))
    .catch(error => msgError(error))

export const getCustomQuestions = id => dispatch =>
  coaches
    .getCustomQuestions(id)
    .then(({ data }) => dispatch(getCustomQuestionsAction(data?.questions)))
    .catch(error => msgError(error))

export const updateCustomQuestions = (id, data) => dispatch =>
  coaches
    .updateCustomQuestions(id, data)
    .then(() => dispatch(getCustomQuestions(id)))
    .catch(error => msgError(error))

export const changePassword = obj => dispatch =>
  auth
    .changePassword(obj)
    .then(() => {
      notification.success({ message: 'Password successfully changed' })
      push('/auth/sign-in')
      dispatch(logout())
    })
    .catch(error => msgError(error))

export const editProfile = (obj, id) => dispatch =>
  users
    .updateUser(id, obj)
    .then(({ data }) => {
      if (data?.message === 'OK') {
        return true
      }
    })
    .catch(error => msgError(error))

export const accessTokenLogin = obj => dispatch =>
  auth
    .accessTokenLogin(obj)
    .then(() => {})
    .catch(error => msgError(error))

export const getUser = id => dispatch =>
  users
    .getUser(id)
    .then(({ data }) => dispatch(getUserAction(data)))
    .catch(error => msgError(error))

export const changePasswordProfile = data => dispatch =>
  users
    .changePassword(data)
    .then(({ data }) => {
      if (data?.message === 'OK') {
        notification.success({ message: 'Password successfully changed' })
      }
      return 'ok'
    })
    .catch(error => {
      msgError(error)
      return error
    })

export const getCurrentUser = token => dispatch =>
  users
    .getCurrentUser(token)
    .then(({ data }) => {
      dispatch(logCoach({ token, user: data?.data?.user }))
      dispatch(getUserAction(data))
      return data
    })
    .catch(error => msgError(error))

export const getCards = id => dispatch =>
  coaches
    .getCards(id)
    .then(({ data }) => dispatch(sessionGetCards(data)))
    .catch(error => msgError(error))

export const updateCard = data => dispatch =>
  coaches
    .updateCard(data)
    .then(({ data }) => {
      if (data === 'OK') {
        notification.success({ message: 'Card successfully changed' })
      }
    })
    .catch(error => msgError(error))

export const uploadAvatar = data =>
  users
    .postAvatar(data)
    .then(res => {})
    .catch(error => msgError(error))

export const getCoach = token => dispatch =>
  users
    .getCurrentUser(token)
    .then(({ data }) => {
      dispatch(getUserAction(data))
    })
    .catch(error => msgError(error))
