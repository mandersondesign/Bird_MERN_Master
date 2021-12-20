import { api } from './axios'

const METHOD = 'plans'

// athletes for a particular planTemplate
const getPlanAthletes = (
  id,
  page,
  sortField,
  sortDirection,
  query,
  limit = 10,
) =>
  api.get(
    `${METHOD}/${id}/athletes?page=${page}&limit=${limit}&sort=${sortField}&sort_type=${sortDirection}&search=${query}`,
  )

const getTemplateAthletes = ({
  id,
  page,
  sortField,
  sortDirection,
  query,
  limit,
}) =>
  api.get(
    `${METHOD}/${id}/athletes?page=${page}&limit=${limit}&sort=${sortField}&sort_type=${sortDirection}&search=${query}`,
  )
// List of all PlanTemplates with Amounts
const getPlans = () => api.get(`${METHOD}`)

const getPlanCurrentAthlete = id => api.get(`users/${id}/plan`)

const addWeek = (id, data) => api.post(`${METHOD}/${id}/weeks`, data)

const getPaces = () => api.get('paces')

const updatePaces = (id, data) => api.put(`${METHOD}/${id}/paces`, data)

const getPacesByPlan = id => api.get(`${METHOD}/${id}/paces`)

const getLineChart = id => api.get(`users/${id}/plan/chart`)

const endPlan = id => api.post(`${METHOD}/${id}/endplan`)

const sortWeeks = (data, planId) => api.put(`${METHOD}/${planId}/sort`, data)

const deleteWeek = (planId, weekId) =>
  api.delete(`${METHOD}/${planId}/weeks/${weekId}`)

const copyWeek = (planId, weekId) =>
  api.put(`${METHOD}/${planId}/weeks/${weekId}/copy`)

export default {
  getPlanAthletes,
  getTemplateAthletes,
  getPlans,
  getPlanCurrentAthlete,
  addWeek,
  getPaces,
  updatePaces,
  getPacesByPlan,
  getLineChart,
  endPlan,
  sortWeeks,
  deleteWeek,
  copyWeek,
}
