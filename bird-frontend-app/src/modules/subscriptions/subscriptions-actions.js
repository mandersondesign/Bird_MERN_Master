import { FETCH_SUBSCRIPTIONS_FOR_COACHES, FETCH_SUBSCRIPTIONS_FOR_ADMINS } from './subscriptions-constants'
import { subscriptions } from 'api'

const setSubscriptionsCoaches = payload => ({
  type: FETCH_SUBSCRIPTIONS_FOR_COACHES,
  payload,
})

const setSubscriptionsAdmins = payload => ({
  type: FETCH_SUBSCRIPTIONS_FOR_ADMINS,
  payload,
})

export const fetchSubscriptionsForCoaches = () => dispatch => subscriptions.getSubscriptionsForCoaches()
  .then(({ data: { coachPlans = [] } }) => dispatch(setSubscriptionsCoaches(coachPlans)))
  .catch(console.error)

export const fetchSubscriptionsForAdmins = all => dispatch => subscriptions.getSubscriptionsForAdmin(all)
  .then(({ data: { coachPlans = [] } }) => dispatch(setSubscriptionsAdmins(coachPlans)))
  .catch(console.error)
