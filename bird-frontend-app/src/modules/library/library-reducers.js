import { LIBRARY_PLANS, LIBRARY_GET_PLAN, RESET_PLAN_TEMPLATE, IS_NEW_PHASE, SORT_PHASES, SORT_WEEKS, FILTER_PHASES, FILTER_WEEKS } from './library-constants'

export const libraryInitialState = {
  plans: [],
  planTemplate: {},
  isNewPhase: false,
  namesOfPhases: [],
  namesOfWeeks: [],
}

export const libraryReducer = (state = libraryInitialState, { type, payload }) => {
  switch (type) {
  case LIBRARY_PLANS:
    return { ...state, plans: payload.data.planTemplates }
  case LIBRARY_GET_PLAN:
    return { ...state, planTemplate: payload.planTemplate }
  case RESET_PLAN_TEMPLATE:
    return { ...state, planTemplate: {} }
  case IS_NEW_PHASE:
    return { ...state, isNewPhase: payload }
  case SORT_PHASES:
    return { ...state, planTemplate: { ...state.planTemplate, planPhaseTemplate: payload } }
  case SORT_WEEKS:
    return { ...state, planTemplate: { ...state.planTemplate, planPhaseTemplate: payload } }
  case FILTER_PHASES:
    return { ...state, namesOfPhases: payload }
  case FILTER_WEEKS:
    return { ...state, namesOfWeeks: payload }
  default:
    return state
  }
}
