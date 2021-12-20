import { api } from './axios'

const METHOD = 'athletes'

const getAthlets = (url = 'athletes', page, query) =>
  api.get(
    `${METHOD}/me/${url}?page=${page}&limit=100&sort=name&sort_type=asc&search=${query}`,
  )

const inviteAthlete = data => api.post(`${METHOD}/invite`, data)

const assignPlan = (id, data) => api.post(`${METHOD}/${id}/plan`, data)

const getAthleteProfile = id => api.get(`${METHOD}/${id}`)

const delAthlete = id => api.delete(`${METHOD}/${id}`)

const publishPlan = id => api.post(`${METHOD}/${id}/publish`)

const batchPublishPlan = ids => api.post(`${METHOD}/publish?ids=${ids}`)

const getMessages = id => api.get(`${METHOD}/${id}/messages`)

const getNote = id => api.get(`${METHOD}/${id}/note`)

const setNote = (id, data) => api.post(`${METHOD}/${id}/note`, data)

const reInvite = id => api.post(`${METHOD}/${id}/reinvite`)

export default {
  getAthlets,
  inviteAthlete,
  assignPlan,
  getAthleteProfile,
  delAthlete,
  publishPlan,
  getMessages,
  batchPublishPlan,
  setNote,
  getNote,
  reInvite,
}
