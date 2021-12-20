import {
  PLANS_START, PLANS_SUBMIT, PLANS_SUBMIT_FAILURE, PLANS_SUBMIT_SUCCESS, PLANS_UPDATE, SHOW_PAYMENT_FORM,
} from './plans-constants'

export const plansInitialState = {
  athlet: {},
  athlets: [],
  meta: {},
  token: null,
  loading: {
    login: false,
  },
  errors: null,
}

export const plansReducer = (state = plansInitialState, { type, payload }) => {
  switch (type) {
  case PLANS_START:
    return { ...state, busy: true }
  case PLANS_UPDATE:
    return { ...state, athlets: payload.athletes, meta: payload.meta }
  case SHOW_PAYMENT_FORM:
    return { ...state, selectedSubscription: payload }
  case PLANS_SUBMIT:
    return payload
  case PLANS_SUBMIT_SUCCESS:
    return state
  case PLANS_SUBMIT_FAILURE:
    return payload
  default:
    return state
  }
}
