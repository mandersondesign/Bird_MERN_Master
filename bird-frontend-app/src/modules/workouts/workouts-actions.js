import { workouts } from 'api'
import { getPlanCurrentAthlete } from 'modules/athlets/athlets-actions'
import { notification } from 'antd'
import { GET_WORKOUTS, GET_TYPES_WORKOUTS, GET_ALL_WORKOUTS } from './workouts-constants'
import { showError } from 'utils'

export const getWorkoutsList = payload => ({ type: GET_WORKOUTS, payload })

export const getAllWorkoutsList = payload => ({ type: GET_ALL_WORKOUTS, payload })

export const workoutTypes = payload => ({ type: GET_TYPES_WORKOUTS, payload })

/* ---------------------------------------------------------------------- */

export const getWorkouts = (limit, page, workoutTypeId, sort, sortType, search) => dispatch => workouts.getWorkouts(limit, page, workoutTypeId, sort, sortType, search)
  .then(({ data }) => dispatch(getWorkoutsList(data)))
  .catch(err => showError(err))

export const getAllWorkouts = (limit, page, workoutTypeId, sort, sortType, search) => dispatch => workouts.getAllWorkoutLibrary(limit, page, workoutTypeId, sort, sortType, search)
  .then(({ data }) => {
    dispatch(getWorkoutsList(data))
    dispatch(getAllWorkoutsList(data))
  })
  .catch(err => showError(err))

export const delWorkout = id => dispatch => workouts.delWorkoutLibrary(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      notification.success({ message: 'Deleted!' })
    }
  })
  .catch(err => showError(err))

export const createWorkout = data => dispatch => workouts.createWorkoutLibrary(data)
  .then(({ data }) => data?.message === 'OK')
  .catch(err => showError(err))

export const editWorkout = (id, data) => dispatch => workouts.editWorkoutLibrary(id, data)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      notification.success({ message: 'Updated!' })
      return true
    }
  })
  .catch(err => showError(err))

export const getTypesWorkout = () => dispatch => workouts.getTypesForWorkout()
  .then(({ data }) => dispatch(workoutTypes(data)))
  .catch(err => showError(err))

export const likeWorkout = (id, userId) => dispatch => workouts.likeWorkout(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      dispatch(getPlanCurrentAthlete(userId))
      return true
    }
  })
  .catch(err => showError(err))

export const unlikeWorkout = (id, userId) => dispatch => workouts.unlikeWorkout(id)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      dispatch(getPlanCurrentAthlete(userId))
      return true
    }
  })
  .catch(err => showError(err))

export const postComment = (id, data) => dispatch => workouts.postComment(id, data)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      return true
    }
  })
  .catch(err => showError(err))

export const getComments = (id, data) => dispatch => workouts.getComments(id, data)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      return data?.messages
    }
  })
  .catch(err => showError(err))
