import { athletes, coaches, plans, workouts, weeks } from 'api'
import { notification } from 'antd'
import {
  ATHLETS_START, ATHLETS_SUBMIT, ATHLETS_SUBMIT_FAILURE, ATHLETS_SUBMIT_SUCCESS, ATHLETS_UPDATE, ATHLETS_PLANS,
  ATHLETE_PROFILE, ATHLETE_PACES, ATHLETE_PLAN, WORKOUT_TYPES, PACES_PLAN, LINE_CHART, ATHLETS_MESSAGES, ATHLETS_NOTE,
  ATHLETE_RESET, MARK_FAVORITE_WORKOUT, UNMARK_FAVORITE_WORKOUT, ATHLETE_SET_PLAN,
} from './athlets-constants'
import { showError } from 'utils'

export const usersStart = () => ({
  type: ATHLETS_START,
})

export const athletsUpdateAction = payload => ({
  type: ATHLETS_UPDATE,
  payload,
})

export const usersSubmitAction = payload => ({
  type: ATHLETS_SUBMIT,
  payload,
})

export const usersSubmitSuccessAction = () => ({
  type: ATHLETS_SUBMIT_SUCCESS,
})

export const usersSubmitFailureAction = error => ({
  type: ATHLETS_SUBMIT_FAILURE,
  payload: error,
})

export const plansAction = payload => ({
  type: ATHLETS_PLANS,
  payload,
})

export const athleteProfileAction = payload => ({
  type: ATHLETE_PROFILE,
  payload,
})

export const athletePlanAction = payload => ({
  type: ATHLETE_PLAN,
  payload,
})

export const athleteSetPlanAction = payload => ({
  type: ATHLETE_SET_PLAN,
  payload,
})

export const athletePacesAction = payload => ({
  type: ATHLETE_PACES,
  payload,
})

export const getPacesPlan = payload => ({
  type: PACES_PLAN,
  payload,
})

export const workoutTypes = payload => ({
  type: WORKOUT_TYPES,
  payload,
})

export const lineChart = payload => ({
  type: LINE_CHART,
  payload,
})

export const messagesAthlete = payload => ({
  type: ATHLETS_MESSAGES,
  payload,
})

export const getNote = payload => ({
  type: ATHLETS_NOTE,
  payload,
})

export const resetPlan = payload => ({
  type: ATHLETE_RESET,
  payload,
})

export const markWorkout = payload => ({
  type: MARK_FAVORITE_WORKOUT,
  payload,
})

export const unMarkWorkout = payload => ({
  type: UNMARK_FAVORITE_WORKOUT,
  payload,
})

export const getAthletes = (url, page, sortField, sortDirection, query = '') => dispatch => coaches.getAthletes(url, page, sortField, sortDirection, query)
  .then(({ data }) => {
    dispatch(athletsUpdateAction(data || []))
  })
  .catch(err => {
    notification.error({ message: `Error loading athletes: ${err}` })
  })

export const delAthlete = id => () => athletes.delAthlete(id)
  .then(() => {
    notification.success({ message: 'deleted' })
  })
  .catch(() => {
    notification.error({ message: 'error delete athlete' })
  })

export const resetPlanOfAthlete = () => dispatch => dispatch(resetPlan())

export const getPaces = () => dispatch => plans.getPaces()
  .then(({ data }) => {
    dispatch(athletePacesAction(data))
  })
  .catch(() => {
    notification.error({ message: 'error get paces by plan' })
  })

export const publishPlanAthlete = id => () => athletes.publishPlan(id)
  .then(() => {
    notification.success({ message: 'published' })
  })
  .catch(error => {
    const message = error.response.data.error
    notification.warning({ message })
  })

export const batchPublishPlanAthlete = ids => () => athletes.batchPublishPlan(ids)
  .then(() => {
    notification.success({ message: 'published' })
  })
  .catch(error => {
    const message = error.response.data.error
    notification.warning({ message })
  })

export const getPlans = () => dispatch => plans.getPlans()
  .then(({ data }) => {
    dispatch(plansAction(data || []))
  })
  .catch(() => {
    notification.error({ message: 'error plans' })
  })

export const getAthleteProfile = id => dispatch => athletes.getAthleteProfile(id)
  .then(({ data }) => {
    dispatch(athleteProfileAction(data || {}))
    dispatch(getPaces())
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const endPlan = (id, userId) => dispatch => plans.endPlan(id)
  .then(() => {
    dispatch(getAthleteProfile(userId))
    notification.success({ message: 'success' })
  })
  .catch(() => {
    notification.error({ message: 'error end plan' })
  })

export const getMessagesAthlete = id => dispatch => athletes.getMessages(id)
  .then(({ data }) => {
    dispatch(messagesAthlete(data || {}))
    dispatch(getPaces())
  })
  .catch(() => {
    notification.error({ message: 'error get profile' })
  })

export const getLineChart = id => dispatch => plans.getLineChart(id)
  .then(({ data }) => {
    dispatch(lineChart(data))
  })
  .catch(() => {
    notification.error({ message: 'error get profile' })
  })

export const getTypesWorkout = () => dispatch => workouts.getTypesForWorkout()
  .then(({ data }) => {
    dispatch(workoutTypes(data))
  })
  .catch(() => {
    notification.error({ message: 'error get paces by plan' })
  })

export const setPlanAthlete = data => dispatch => dispatch(athleteSetPlanAction(data))

export const getPlanCurrentAthlete = id => dispatch => plans.getPlanCurrentAthlete(id)
  .then(({ data, meta }) => {
    dispatch(athletePlanAction(data || {}, meta || {}))
    dispatch(getLineChart(id))
    dispatch(getPaces())
    dispatch(getTypesWorkout())
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const updatePaces = (id, data) => () => plans.updatePaces(id, data)
  .then(() => { })
  .catch(() => {
    notification.error({ message: 'error update paces' })
  })

export const setAthleteNotes = (id, data) => () => athletes.setNote(id, data)
  .then(() => { })
  .catch(() => {
    notification.error({ message: 'error set notes' })
  })

export const getAthleteNotes = id => dispatch => athletes.getNote(id)
  .then(({ data }) => {
    dispatch(getNote(data))
  })
  .catch(() => {
    notification.error({ message: 'error get notes' })
  })

export const getPacesCurrentPlan = id => dispatch => plans.getPacesByPlan(id)
  .then(({ data }) => {
    dispatch(getPacesPlan(data))
  })
  .catch(() => {
    notification.error({ message: 'error update paces' })
  })

export const addWeekForPlan = (id, obj, profileId) => dispatch => plans.addWeek(id, obj)
  .then(() => {
    dispatch(getPlanCurrentAthlete(profileId))
  })
  .catch(() => {
    notification.error({ message: 'error get new plan' })
  })

export const publishWeek = (profileId, id) => dispatch => weeks.publishWeek(id)
  .then(() => {
    dispatch(getPlanCurrentAthlete(profileId))
    notification.success({ message: 'Week was published successfully' })
  })
  .catch(() => {
    notification.error({ message: 'error publish week' })
  })

export const updateWeek = (profileId, id, obj) => dispatch => weeks.updateWeek(id, obj)
  .then(() => {
    dispatch(getPlanCurrentAthlete(profileId))
  })
  .catch(() => {
    notification.error({ message: 'error update week' })
  })

export const delWorkout = (id, profileId) => dispatch => workouts.delWorkout(id)
  .then(() => {
    dispatch(getPlanCurrentAthlete(profileId))
    return true
  })
  .catch(() => {
    notification.error({ message: 'error delete workout' })
  })

export const createWorkout = (profileId, obj) => dispatch => workouts.createWorkout(obj)
  .then(() => {
    dispatch(getPlanCurrentAthlete(profileId))
    return true
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const editWorkout = (profileId, id, data) => dispatch => workouts.editWorkout(id, data)
  .then(() => {
    dispatch(getPlanCurrentAthlete(profileId))
    return true
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const copyWorkout = (profileId, id, data) => dispatch => workouts.copyWorkout(id, data)
  .then(res => {
    dispatch(getPlanCurrentAthlete(profileId))
    const messages = res.data?.messages || []

    if (messages?.length) {
      messages.forEach(message => {
        if (message.includes('successfully')) {
          notification.success({ message })
        } else {
          notification.error({ message })
        }
      })
    }
  })
  .catch(() => {
    notification.error({ message: 'error copy workout' })
  })

export const markWorkoutAsFavorite = (id, userId) => dispatch => workouts.markWorkoutAsFavorite(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      dispatch(getPlanCurrentAthlete(userId))
      return true
    }
  })
  .catch(err => {
    showError(err)
    return false
  })

export const unmarkWorkoutAsFavorite = (id, userId) => dispatch => workouts.unmarkWorkoutAsFavorite(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      dispatch(getPlanCurrentAthlete(userId))
      return true
    }
  })
  .catch(err => {
    showError(err)
    return false
  })

export const reInvite = id => dispatch => athletes.reInvite(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      notification.success({ message: 'Success! Invite has been resent.' })
      return true
    }
  })
  .catch(err => {
    notification.error({ message: err })
  })
