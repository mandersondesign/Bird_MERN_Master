import { api } from './axios'

const METHOD = 'workouts'
const METHOD_LIB = 'workout_library'

const postComment = (id, data) => api.put(`${METHOD}/${id}/athlete_notes`, data)

const getComments = id => api.get(`${METHOD}/${id}/athlete_notes`)

const delWorkout = id => api.delete(`${METHOD}/${id}`)

const createWorkout = data => api.post(`${METHOD}`, data)

const editWorkout = (id, data) => api.put(`${METHOD}/${id}`, data)

const copyWorkout = (id, data) => api.post(`${METHOD}/${id}/copy`, data)

const getTypesForWorkout = () => api.get(`${METHOD}/types`)

const markWorkoutAsFavorite = (id, data) =>
  api.post(`${METHOD}/${id}/mark`, { status_id: 2 })

const unmarkWorkoutAsFavorite = (id, data) =>
  api.delete(`${METHOD}/${id}/mark`, { status_id: 2 })

const likeWorkout = id => api.post(`${METHOD}/${id}/like`, { status_id: 2 })

const unlikeWorkout = id => api.delete(`${METHOD}/${id}/like`, { status_id: 2 })

const getWorkouts = (limit, page, workoutTypeId, sort, sortType, search = '') =>
  api.get(
    `${METHOD_LIB}?limit=${limit}&page=${page}&workout_type_id=${workoutTypeId}&sort=${sort}&sort_type=${sortType}&search=${search}`,
  )

const delWorkoutLibrary = id => api.delete(`${METHOD_LIB}/${id}`)

const createWorkoutLibrary = data => api.post(`${METHOD_LIB}`, data)

const editWorkoutLibrary = (id, data) => api.put(`${METHOD_LIB}/${id}`, data)

const getAllWorkoutLibrary = (
  limit,
  page,
  workoutTypeId,
  sort,
  sortType,
  search = '',
) =>
  api.get(
    `${METHOD_LIB}?limit=1000&page=${page}&workout_type_id=${workoutTypeId}&sort=${sort}&sort_type=${sortType}&search=${search}`,
  )

const getChart = id => api.get(`${METHOD}/${id}/pace_chart`)

const scheduleMessage = (workoutId, body) =>
  api.post(`${METHOD}/${workoutId}/update_message`, body)

const getWorkoutById = athleteId => api.get(`${METHOD}/${athleteId}/workouts`)

export default {
  delWorkout,
  createWorkout,
  editWorkout,
  copyWorkout,
  getTypesForWorkout,
  markWorkoutAsFavorite,
  unmarkWorkoutAsFavorite,
  getWorkouts,
  delWorkoutLibrary,
  editWorkoutLibrary,
  createWorkoutLibrary,
  getAllWorkoutLibrary,
  getChart,
  likeWorkout,
  unlikeWorkout,
  postComment,
  getComments,
  scheduleMessage,
  getWorkoutById,
}
