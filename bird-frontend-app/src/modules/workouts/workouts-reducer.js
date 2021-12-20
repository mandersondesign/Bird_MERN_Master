import { GET_WORKOUTS, GET_ALL_WORKOUTS, GET_TYPES_WORKOUTS } from './workouts-constants'

export const workoutsInitialState = {
  allWorkouts: [],
  workouts: [],
  meta: {},
  workoutsTypes: [],
}

export const workoutsReducer = (state = workoutsInitialState, { type, payload }) => {
  switch (type) {
  case GET_WORKOUTS:
    return { ...state, workouts: payload.workouts, meta: payload.meta }
  case GET_TYPES_WORKOUTS:
    return { ...state, workoutsTypes: payload.workoutTypes }
  case GET_ALL_WORKOUTS: {
    const workouts = payload?.workouts?.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    })

    return { ...state, allWorkouts: workouts }
  }
  default:
    return state
  }
}
