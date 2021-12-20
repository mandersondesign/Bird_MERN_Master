import { FETCH_SUBSCRIPTIONS_FOR_COACHES, FETCH_SUBSCRIPTIONS_FOR_ADMINS } from './subscriptions-constants'

export const subscriptionsInitialState = {
  coachPlans: [],
  adminsPlans: [],
}

export const subscriptionsReducer = (state = subscriptionsInitialState, { type, payload }) => {
  switch (type) {
  case FETCH_SUBSCRIPTIONS_FOR_COACHES:
    return { ...state, coachPlans: payload }
  case FETCH_SUBSCRIPTIONS_FOR_ADMINS:
    return { ...state, adminsPlans: payload }
  default:
    return state
  }
}
