import { api } from './axios'

const METHOD = 'subscriptions'

const getSubscriptionsForCoaches = (all = false) => api.get(`${METHOD}/coach`)

const getSubscriptionsForAdmin = (all = false) => api.get(`${METHOD}/coach?show_all=${all}`)

const subscriptionPlan = data => api.post(`${METHOD}/coach`, data)

export default {
  getSubscriptionsForCoaches,
  subscriptionPlan,
  getSubscriptionsForAdmin,
}
