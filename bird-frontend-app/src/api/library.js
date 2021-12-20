import { api } from './axios'

const METHOD = 'plan_templates'

const getPlansTemplates = (sortField, sortDirection) =>
  api.get(`${METHOD}?sort=${sortField}&sort_type=${sortDirection}`)

const createPlan = data => api.post(METHOD, data)

const deletePlan = id => api.delete(`${METHOD}/${id}`)

const getPlanTemplate = id => api.get(`${METHOD}/${id}`)

const updatePlan = (planId, data) => api.put(`${METHOD}/${planId}`, data)

const addNewPhases = (id, data) => api.post(`${METHOD}/${id}/phases`, data)

const addNewWeek = (planId, phaseId, data) =>
  api.post(`${METHOD}/${planId}/phases/${phaseId}/weeks`, data)

const updatePhase = (planId, phaseId, data) =>
  api.put(`${METHOD}/${planId}/phases/${phaseId}`, data)

const delPhase = (planId, phaseId) =>
  api.delete(`${METHOD}/${planId}/phases/${phaseId}`)

const updateWeek = (planId, phaseId, weekId, data) =>
  api.put(`${METHOD}/${planId}/phases/${phaseId}/weeks/${weekId}`, data)

const delWeek = (planId, phaseId, weekId) =>
  api.delete(`${METHOD}/${planId}/phases/${phaseId}/weeks/${weekId}`)

const addWorkout = (planId, phaseId, weekId, data) =>
  api.post(
    `${METHOD}/${planId}/phases/${phaseId}/weeks/${weekId}/workouts`,
    data,
  )

const updateWorkout = (planId, phaseId, weekId, workoutId, data) =>
  api.put(
    `${METHOD}/${planId}/phases/${phaseId}/weeks/${weekId}/workouts/${workoutId}`,
    data,
  )

const delWorkout = (planId, phaseId, weekId, workoutId) =>
  api.delete(
    `${METHOD}/${planId}/phases/${phaseId}/weeks/${weekId}/workouts/${workoutId}`,
  )

const sortPlan = (planId, data) => api.put(`${METHOD}/${planId}/sort`, data)

const scheduleMessage = (workoutTemplateId, body) =>
  api.put(`${METHOD}/${workoutTemplateId}/update_message`, body)

export default {
  getPlansTemplates,
  createPlan,
  deletePlan,
  getPlanTemplate,
  addNewPhases,
  addNewWeek,
  updatePhase,
  delPhase,
  updateWeek,
  addWorkout,
  updatePlan,
  delWeek,
  updateWorkout,
  delWorkout,
  sortPlan,
  scheduleMessage,
}
