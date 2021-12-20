import { api } from './axios'

const METHOD = 'weeks'

const updateWeek = (id, data) => api.put(`${METHOD}/${id}`, data)

const publishWeek = id => api.post(`${METHOD}/${id}/publish`)

const getChart = id => api.get(`${METHOD}/${id}/chart`)

const getChartWeeks = id => api.get(`users/${id}/plan/chart_by_day`)

export default {
  updateWeek,
  publishWeek,
  getChart,
  getChartWeeks,
}
