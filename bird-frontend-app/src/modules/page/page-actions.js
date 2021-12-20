import {
  LOADING_PAGE_ATHLETES,
  READ_NEW_MESSAGE,
  RESET_PAGE_ATHLETES,
  SET_ALL_ATHLETES,
  SET_CURRENT_SORT,
  SET_PAGE_ATHLETES,
  SHIFT_MESSAGED_ATHLETE,
  SORT_ALL_ATHLETES,
  SORT_ATHLETES,
  TOGGLE_ATHLETE_WORKOUT,
} from './page-constants'

export const setAllAthletes = allAthletes => {
  return {
    type: SET_ALL_ATHLETES,
    payload: allAthletes,
  }
}

export const setPageAthletes = athletes => {
  return {
    type: SET_PAGE_ATHLETES,
    payload: athletes,
  }
}

export const loadingPageAthletes = loading => {
  return {
    type: LOADING_PAGE_ATHLETES,
    payload: loading,
  }
}

export const shiftMessagedAthlete = message => {
  return {
    type: SHIFT_MESSAGED_ATHLETE,
    payload: message,
  }
}

export const readNewMessage = athleteId => {
  return {
    type: READ_NEW_MESSAGE,
    payload: athleteId,
  }
}

export const sortAthletes = sortItem => {
  return {
    type: SORT_ATHLETES,
    payload: sortItem,
  }
}

export const sortAllAthletes = sortItem => {
  return {
    type: SORT_ALL_ATHLETES,
    payload: sortItem,
  }
}

export const setCurrentSort = sortItem => {
  return {
    type: SET_CURRENT_SORT,
    payload: sortItem,
  }
}
export const resetPageAthletes = () => {
  return {
    type: RESET_PAGE_ATHLETES,
  }
}

export const toggleAthleteWorkout = workoutId => {
  return {
    type: TOGGLE_ATHLETE_WORKOUT,
    payload: workoutId,
  }
}
