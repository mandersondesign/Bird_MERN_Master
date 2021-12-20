import {
  ATHLETS_START, ATHLETS_SUBMIT, ATHLETS_SUBMIT_FAILURE, ATHLETS_SUBMIT_SUCCESS, ATHLETS_UPDATE, ATHLETS_PLANS,
  ATHLETE_PROFILE, ATHLETE_PLAN, ATHLETE_PACES, WORKOUT_TYPES, PACES_PLAN, LINE_CHART, ATHLETS_MESSAGES, ATHLETS_NOTE,
  ATHLETE_RESET, MARK_FAVORITE_WORKOUT, UNMARK_FAVORITE_WORKOUT, ATHLETE_SET_PLAN,
} from './athlets-constants'

export const athletsInitialState = {
  athlet: {},
  athlets: [],
  meta: {},
  paces: [],
  token: null,
  loading: {
    login: false,
  },
  plans: [],
  profile: {},
  note: '',
  planCurrentAthlete: {},
  lineChart: {},
  messages: [],
  pacesWorkout: [],
  typesForWorkout: [],
  errors: null,
}

export const athletsReducer = (state = athletsInitialState, { type, payload }) => {
  switch (type) {
  case ATHLETS_START:
    return { ...state, busy: true }
  case ATHLETS_UPDATE:
    return { ...state, athlets: payload.athletes, meta: payload.meta, profile: {} }
  case ATHLETS_SUBMIT:
    return payload
  case ATHLETS_SUBMIT_SUCCESS:
    return state
  case ATHLETS_SUBMIT_FAILURE:
    return payload
  case ATHLETS_PLANS:
    return { ...state, plans: payload.data.planTemplates }
  case ATHLETE_PROFILE:
    return { ...state, profile: payload.athlete }
  case ATHLETE_PLAN:
    return { ...state, planCurrentAthlete: { data: payload.data, meta: payload.meta } }
  case ATHLETE_SET_PLAN:
    return { ...state, planCurrentAthlete: { ...state.planCurrentAthlete, data: { ...state.planCurrentAthlete.data, phases: payload } } }
  case ATHLETE_PACES:
    return { ...state, paces: payload.paces }
  case WORKOUT_TYPES:
    return { ...state, typesForWorkout: payload.workoutTypes }
  case PACES_PLAN:
    return { ...state, pacesWorkout: payload.paces }
  case LINE_CHART:
    return { ...state, lineChart: { lineChart: payload.data, completedData: payload.completedData } }
  case ATHLETS_MESSAGES:
    return { ...state, messages: payload.messages }
  case ATHLETS_NOTE:
    return { ...state, note: payload.data.note }
  case ATHLETE_RESET:
    return { ...state, profile: {}, planCurrentAthlete: {}, pacesWorkout: [], typesForWorkout: [], lineChart: {} }
  case MARK_FAVORITE_WORKOUT:
    return {
      ...state,
      planCurrentAthlete: {
        ...state?.planCurrentAthlete,
        data: {
          ...state?.planCurrentAthlete?.data,
          phases: state?.planCurrentAthlete?.data?.phases.map(phase => ({
            ...phase,
            weeks: phase?.weeks.map(week => ({
              ...week,
              workouts: week?.workouts.map(workout => ({
                ...workout,
                isMarkedAsKey: workout?.workoutId === payload ? true : workout?.isMarkedAsKey,
              })),
            })),
          })),
        },
      },
    }
  case UNMARK_FAVORITE_WORKOUT:
    return {
      ...state,
      planCurrentAthlete: {
        ...state?.planCurrentAthlete,
        data: {
          ...state?.planCurrentAthlete?.data,
          phases: state?.planCurrentAthlete?.data?.phases.map(phase => ({
            ...phase,
            weeks: phase?.weeks.map(week => ({
              ...week,
              workouts: week?.workouts.map(workout => ({
                ...workout,
                isMarkedAsKey: workout?.workoutId === payload ? false : workout?.isMarkedAsKey,
              })),
            })),
          })),
        },
      },
    }
  default:
    return state
  }
}
