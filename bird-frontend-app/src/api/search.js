import { api } from './axios'

const METHOD = 'search'

const getSearch = query => api.get(`${METHOD}?query=${query}`)

export default {
  getSearch,
}
