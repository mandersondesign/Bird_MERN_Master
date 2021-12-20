import { api } from './axios'

const METHOD = 'coaches'

const getAthletes = (url = 'athletes', page, sortField, sortDirection, query) =>
  api.get(
    `${METHOD}/me/${url}?page=${page}&limit=10&sort=${sortField}&sort_type=${sortDirection}&search=${query}`,
  )

const getAllAthletes = ({
  url = 'athletes',
  page,
  sortField,
  sortDirection,
  query,
  limit,
}) =>
  api.get(
    `${METHOD}/me/${url}?page=${page}&limit=${limit}&sort=${sortField}&sort_type=${sortDirection}&search=${query}`,
  )

const listAllAthletes = () => api.get(`${METHOD}/me/athletes_all`)

const getAthleteMetaInfo = () => api.get(`${METHOD}/me/athletes/meta`)

const addInfoStepFirst = (idUser, data) =>
  api.put(`${METHOD}/${idUser}/info`, data)

const getInfo = id => api.get(`${METHOD}/${id}/info`)

const getCards = id => api.get(`coaches/${id}/cards`)

const updateCard = data => api.post('stripe/cards', data)

const getMeasurement = () => api.get('users/me')

const updateMeasurement = (id, data) =>
  api.put(`${METHOD}/${id}/measurement`, data)

const getCustomQuestions = id => api.get(`${METHOD}/${id}/custom_questions`)

const updateCustomQuestions = (id, data) =>
  api.put(`${METHOD}/${id}/custom_questions`, data)

export default {
  getAthletes,
  getAllAthletes,
  listAllAthletes,
  getAthleteMetaInfo,
  addInfoStepFirst,
  getInfo,
  getCards,
  updateCard,
  getMeasurement,
  updateMeasurement,
  getCustomQuestions,
  updateCustomQuestions,
}
