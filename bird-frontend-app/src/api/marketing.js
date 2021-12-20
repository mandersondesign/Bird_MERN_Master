import { api, api2 } from './axios'

const METHOD = 'program'

const getProgram = alias => api.get(`${METHOD}/${alias}`)

const getSubscription = alias => api.get(`subscriptions/athlete/${alias}`)

const paySubscription = data => api.post('subscriptions/athlete', data)

const pay = data => api.post(`${METHOD}/pay`, data)

const checkCode = (alias, coupon) => api.get(`${METHOD}/${alias}/coupons/${coupon}`)

const registration = data => api.post('auth/preRegistrationWithoutPlan', data)

const login = data => api2.post('auth/login', data)

const addProspect = data => api.post('auth/prospect', data)

export default {
  addProspect,
  getProgram,
  login,
  pay,
  checkCode,
  registration,
  paySubscription,
  getSubscription,
}
