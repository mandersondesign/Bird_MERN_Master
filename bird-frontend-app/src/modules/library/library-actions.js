import { library } from 'api'
import { notification } from 'antd'
import { push } from 'modules/router'
import { LIBRARY_PLANS, LIBRARY_GET_PLAN, RESET_PLAN_TEMPLATE, IS_NEW_PHASE, SORT_PHASES, FILTER_PHASES, FILTER_WEEKS, SORT_WEEKS } from './library-constants'
import { getTypesWorkout } from 'modules/athlets/athlets-actions'

export const libraryGetPlans = payload => ({ type: LIBRARY_PLANS, payload })

export const getPlan = payload => ({ type: LIBRARY_GET_PLAN, payload })

export const resetPlan = payload => ({ type: RESET_PLAN_TEMPLATE, payload })

export const setIsPhase = payload => ({ type: IS_NEW_PHASE, payload })

export const sortPhases = payload => ({ type: SORT_PHASES, payload })

export const sortWeeks = payload => ({ type: SORT_WEEKS, payload })

export const filterNamesPhases = payload => ({ type: FILTER_PHASES, payload })

export const filterNamesWeeks = payload => ({ type: FILTER_WEEKS, payload })

export const getPlansTemplates = (sortField, sortDirection) => dispatch => library.getPlansTemplates(sortField, sortDirection)
  .then(({ data }) => dispatch(libraryGetPlans(data)))
  .catch(() => { })

export const createPlan = data => dispatch => library.createPlan(data)
  .then(({ data }) => {
    const { planTemplateId } = data.planTemplate
    push(`/my_library/${planTemplateId}/plan_template`)
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const deletePlan = id => dispatch => library.deletePlan(id)

export const getPlanTemplate = id => dispatch => library.getPlanTemplate(id)
  .then(({ data }) => {
    dispatch(getPlan(data))
    dispatch(setNewPhase(false))
  })
  .catch(() => { })

export const addNewPhases = (array, id, data) => dispatch => library.addNewPhases(id, data)
  .then(({ data }) => {
    const { planPhaseTemplateId } = data.planPhaseTemplate

    dispatch(filterPhases(array, planPhaseTemplateId))
  })

export const addNewWeek = (array, planId, phaseId, data) => dispatch => library.addNewWeek(planId, phaseId, data)
  .then(({ data }) => {
    const { planWeekTemplateId } = data.planWeekTemplate

    dispatch(filterWeeks(array, planWeekTemplateId))
  })

export const updatePhase = (planId, phaseId, data) => dispatch => library.updatePhase(planId, phaseId, data)

export const delPhase = (planId, phaseId) => dispatch => library.delPhase(planId, phaseId)
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const updateWeek = (planId, phaseId, weekId, data) => dispatch => library.updateWeek(planId, phaseId, weekId, data)

export const addWorkout = (planId, phaseId, weekId, data) => dispatch => library.addWorkout(planId, phaseId, weekId, data)
  .then(() => {
    dispatch(getTypesWorkout())
    return true
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const updatePlan = (planId, data) => dispatch => library.updatePlan(planId, data)
  .then(() => true)
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const resetPlanTemplate = () => dispatch => dispatch(resetPlan())

export const setNewPhase = bool => dispatch => dispatch(setIsPhase(bool))

export const delWeek = (planId, phaseId, weekId) => dispatch => library.delWeek(planId, phaseId, weekId)

export const delWorkout = (planId, phaseId, weekId, workoutId) => dispatch => library.delWorkout(planId, phaseId, weekId, workoutId)

export const updateWorkout = (planId, phaseId, weekId, workoutId, data) => dispatch => library.updateWorkout(planId, phaseId, weekId, workoutId, data)
  .then(() => {
    dispatch(getTypesWorkout())
    return true
  })
  .catch(err => {
    const message = err.response.data.error
    notification.error({ message })
  })

export const sortPlan = (planId, data) => dispatch => library.sortPlan(planId, data)

export const sortPhasesPlan = phases => dispatch => dispatch(sortPhases(phases))

export const sortWeeksPlan = phases => dispatch => dispatch(sortWeeks(phases))

export const filterPhases = (array, phaseId) => dispatch => {
  const id = array.find(i => i === phaseId)

  if (id) {
    const newArr = array.filter(i => i !== phaseId)
    dispatch(filterNamesPhases(newArr))
  } else {
    dispatch(filterNamesPhases([...array, phaseId]))
  }
}

export const filterWeeks = (array, weekId) => dispatch => {
  const id = array.find(i => i === weekId)

  if (id) {
    const newArr = array.filter(i => i !== weekId)
    dispatch(filterNamesWeeks(newArr))
  } else {
    dispatch(filterNamesWeeks([...array, weekId]))
  }
}
