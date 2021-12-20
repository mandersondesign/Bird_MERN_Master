import { api } from './axios'

const METHOD = 'users'

const changeCurrentUserPassword = data => api.post(`${METHOD}/me/changePassword`, data)

const getCurrentUser = token => {
  const body = token ? { headers: { token } } : {}
  return api.get(`${METHOD}/me`, body)
}

const postAvatar = res => {
  const data = new FormData()
  const files = res?.fileList || []
  const obj = files[files.length - 1]
  data.append('data', obj?.originFileObj)
  return api.post(`${METHOD}/me/avatar`, data)
}

const updateUser = (id, data) => api.put(`${METHOD}/${id}`, data)

const createUser = data => api.post(`${METHOD}`, data)

const getUsers = (page, query) => api.get(`${METHOD}?page=${page}&limit=10&search=${query}`)

const getUser = id => api.get(`${METHOD}/${id}`)

const changePassword = data => api.put(`${METHOD}/me/password`, data)

const getCurrentPlan = (token, id) => api.get(`users/${id}/plan`, {
  headers: {
    token,
  },
},
)

export default {
  changeCurrentUserPassword,
  getCurrentUser,
  getUser,
  changePassword,
  updateUser,
  createUser,
  getUsers,
  getCurrentPlan,
  postAvatar,
}
