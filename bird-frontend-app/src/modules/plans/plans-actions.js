import { plans, weeks, workouts, athletes } from 'api'
import { notification } from 'antd'
import { showError } from 'utils'
import { PLANS_START, PLANS_SUBMIT, PLANS_SUBMIT_FAILURE, PLANS_SUBMIT_SUCCESS, PLANS_UPDATE, SHOW_PAYMENT_FORM } from './plans-constants'

export const usersStart = () => ({ type: PLANS_START })

export const plansUpdateAction = payload => ({ type: PLANS_UPDATE, payload })

export const usersSubmitAction = payload => ({ type: PLANS_SUBMIT, payload })

export const usersSubmitSuccessAction = () => ({ type: PLANS_SUBMIT_SUCCESS })

export const usersSubmitFailureAction = error => ({ type: PLANS_SUBMIT_FAILURE, payload: error })

export const showPaymentForm = selectedSubscription => ({ type: SHOW_PAYMENT_FORM, payload: selectedSubscription })

export const getPlanAthletes = (id, page, sortField, sortDirection, query = '') => dispatch => plans.getPlanAthletes(id, page, sortField, sortDirection, query)
  .then(({ data }) => {
    dispatch(plansUpdateAction(data || []))
  })
  .catch(() => {})

export const sortWeeks = (planId, data) => dispatch => plans.sortWeeks(data, planId)
  .then(res => {})
  .catch(err => showError(err))

export const deleteWeek = (planId, weekId) => dispatch => plans.deleteWeek(planId, weekId)
  .then(res => {
    notification.success({ message: 'Week deleted successfully' })
  })
  .catch(err => showError(err))

export const copyWeek = (planId, weekId) => dispatch => plans.copyWeek(planId, weekId)
  .then(({ data }) => {
    if (data?.message === 'OK') return data
  })

export const getChartWeek = id => dispatch => weeks.getChart(id)
  .then(({ data }) => {
    if (data.message === 'OK') return data
  })
  .catch(err => showError(err))

export const getChartWeeks = id => dispatch => weeks.getChartWeeks(id)
  .then(({ data }) => {
    if (data.message === 'OK') return data
  })
  .catch(err => showError(err))

export const getChartWorkout = id => dispatch => workouts.getChart(id)
  .then(({ data }) => {
    if (data.message === 'OK') return data
  })
  .catch(err => showError(err))

export const getMessages = id => dispatch => athletes.getMessages(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      return data?.messages
    }
  })
  .catch(err => showError(err))
