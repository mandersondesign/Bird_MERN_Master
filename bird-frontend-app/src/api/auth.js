import { api } from './axios'

import users from './users'

const METHOD = 'auth'

const logout = () => api.post(`${METHOD}/logout`)

// const login = data => api.post(`${METHOD}/login`, data);

const getUserModel = async token => {
  try {
    const {
      data: { data: { user } },
    } = await users.getCurrentUser(token)
    return Promise.resolve({ token, user })
  } catch (e) {
    return Promise.reject(e)
  }
}

const login = async data => {
  try {
    const response = await api.post(`${METHOD}/login`, data)
    return response?.data?.token
      ? await getUserModel(response.data.token)
      : Promise.resolve(response.data)
  } catch (e) {
    return Promise.reject(e)
  }
}

const registration = data => api.post(`${METHOD}/registration`, data)

const resetPassword = data => api.post(`${METHOD}/changePassword`, data)

const requestResetPassword = data => api.post(`${METHOD}/resetPassword`, data)

const resetPasswordCheckToken = data => api.post(`${METHOD}/changePassword/check`, data)

const changePassword = data => api.post(`${METHOD}/changePassword`, data)

const emailConfirm = data => api.post(`${METHOD}/emailConfirm`, data)

const inviteConfirm = data => api.post(`${METHOD}/inviteConfirm`, data)

const logAsCoach = id => api.post(`${METHOD}/loginAsCoach`, { user_id: id })

export default {
  logout,
  login,
  registration,
  resetPassword,
  resetPasswordCheckToken,
  requestResetPassword,
  changePassword,
  emailConfirm,
  inviteConfirm,
  logAsCoach,
  getUserModel,
}
