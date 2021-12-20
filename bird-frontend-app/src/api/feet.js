import { api } from './axios'

const METHOD = 'fleetfeet'

const login = data => api.post('auth/login', data)

const getQuetions = () => api.get(`${METHOD}/survey_questions`)

const getQuestions = id => api.get(`${METHOD}/events/${id}/survey_questions`)

const getEvent = id => api.get(`${METHOD}/events/${id}`)

const getWaiver = id => api.get(`${METHOD}/events/${id}/waiver`)

const registration = data => api.post(`${METHOD}/registration`, data)

const accept = () => api.post('users/me/accept_policy')

const pay = token => api.post(`${METHOD}/pay`, token)

export default {
  getQuetions,
  getEvent,
  getQuestions,
  getWaiver,
  registration,
  accept,
  pay,
  login,
}
