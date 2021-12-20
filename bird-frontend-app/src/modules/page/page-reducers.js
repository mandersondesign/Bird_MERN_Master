import { isEmptyObject } from '../../utils/basic'
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
import {
  defaultSortType,
  getSenderAthlete,
  shiftAthletes,
  sortAthletes,
} from './page-utils'

const initialState = {
  allAthletes: [],
  pageAthletes: [],
  loadingAthletes: false,
  currentSortType: {},
}

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_ALL_ATHLETES: {
    return {
      ...state,
      allAthletes: [...action.payload],
    }
  }

  case SET_PAGE_ATHLETES: {
    return {
      ...state,
      pageAthletes: [...action.payload],
    }
  }

  case LOADING_PAGE_ATHLETES:
    return {
      ...state,
      loadingAthletes: action.payload,
    }

  case SHIFT_MESSAGED_ATHLETE: {
    const { from, msg } = action.payload
    const currentAllAthletes = [...state.allAthletes]

    const senderAthlete = getSenderAthlete(currentAllAthletes, msg, from)
    const { filteredAllAthletes } = shiftAthletes(
      currentAllAthletes,
      senderAthlete,
    )

    return {
      ...state,
      allAthletes: [...filteredAllAthletes],
    }
  }
  case READ_NEW_MESSAGE: {
    const currentAllAthletes = [...state.allAthletes]
    const newAllAthletes = currentAllAthletes.map(athlete => {
      if (athlete.userId === action.payload) {
        return {
          ...athlete,
          hasNewMessage: false,
        }
      }
      return athlete
    })

    return {
      ...state,
      allAthletes: [...newAllAthletes],
    }
  }
  case SORT_ATHLETES: {
    const currentAthletes = [...state.pageAthletes]
    const sortItem = isEmptyObject(action.payload)
      ? defaultSortType
      : action.payload
    const sortedAthletes = sortAthletes({
      athletes: currentAthletes,
      sortItem,
    })

    return {
      ...state,
      pageAthletes: [...sortedAthletes],
    }
  }
  case SORT_ALL_ATHLETES: {
    const currentAllAthletes = [...state.allAthletes]
    const sortItem = isEmptyObject(action.payload)
      ? defaultSortType
      : action.payload
    const sortedAthletes = sortAthletes({
      athletes: currentAllAthletes,
      sortItem,
    })

    return {
      ...state,
      allAthletes: [...sortedAthletes],
    }
  }
  case SET_CURRENT_SORT: {
    return {
      ...state,
      currentSortType: { ...action.payload },
    }
  }
  case TOGGLE_ATHLETE_WORKOUT: {
    const currentAllAthletes = [...state.allAthletes]
    const newAthletes = currentAllAthletes.map(athlete => {
      if (athlete.lastActivityWorkout?.workoutId === action.payload) {
        return {
          ...athlete,
          lastActivityWorkout: {
            ...athlete.lastActivityWorkout,
            isLiked: !athlete.lastActivityWorkout.isLiked,
          },
        }
      }
      return athlete
    })
    return {
      ...state,
      allAthletes: [...newAthletes],
    }
  }
  case RESET_PAGE_ATHLETES:
    return initialState
  default:
    return state
  }
}
