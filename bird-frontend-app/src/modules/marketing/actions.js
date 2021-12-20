import { marketing, users } from 'api'
import { GET_PROGRAM, SET_USER, SET_PROGRAM, LOGOUT, UPDATE_USER } from './constants'
import { showError } from 'utils'
import { notification } from 'antd'

export const getProgramAction = payload => ({ type: GET_PROGRAM, payload })

export const loginAction = payload => ({ type: SET_USER, payload })

export const getCurrentPlanAction = payload => ({ type: SET_PROGRAM, payload })

export const logoutAction = payload => ({ type: LOGOUT, payload })

export const updateUserAction = payload => ({ type: UPDATE_USER, payload })

/* ------------------------------------------------------------------------------------ */

export const getProgram = alias => dispatch => marketing.getProgram(alias)
  .then(({ data }) => {
    dispatch(getProgramAction(data?.program))
  })
  .catch(err => showError(err))

export const pay = data => dispatch => marketing.pay(data)
  .then(res => res)
  .catch(err => showError(err))

export const paySubscription = data => dispatch => marketing.paySubscription(data)
  .then(res => res)
  .catch(err => showError(err))

export const checkCode = (alias, coupon) => dispatch => marketing.checkCode(alias, coupon)
  .then(({ data }) => data?.coupon)
  .catch(err => showError(err))

export const login = data => async dispatch => marketing.login(data)
  .then(({ data }) => {
    if (data?.user?.userTypeId === 2) {
      notification.error({ message: 'Coaches, please login or sign up at Bird.coach' })
    } else {
      dispatch(loginAction(data))
      return data
    }
  })
  .catch(err => showError(err))

export const registration = data => dispatch => marketing.registration(data)
  .then(res => res)
  .catch(err => showError(err))

export const addProspect = data => dispatch => marketing.addProspect(data)
  .then(res => res)
  .catch(err => showError(err))

export const getCurrentPlan = (token, id) => dispatch => users.getCurrentPlan(token, id)
  .then(({ data }) => {
    dispatch(getCurrentPlanAction(data?.data))
    return data
  })
  .catch(err => showError(err))

export const logout = () => dispatch => dispatch(logoutAction())

export const updateUser = (id, dataUser) => dispatch => users.updateUser(id, dataUser)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      dispatch(updateUserAction(dataUser))
      return true
    }
  })
  .catch(err => showError(err))

export const getSubscription = alias => dispatch => marketing.getSubscription(alias)
  .then(({ data }) => {
    dispatch(getProgramAction(data?.athletePlan))
  })
  .catch(err => showError(err))
