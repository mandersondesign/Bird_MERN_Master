import { combineReducers } from 'redux'

import { LOGIN_STATE } from 'modules/auth/login/login-constants'
import { loginReducer } from 'modules/auth/login/login-reducers'

import { SESSION_STATE } from 'modules/session/session-constants'
import { sessionReducer } from 'modules/session/session-reducers'

import { USERS_STATE } from 'modules/users/users-constants'
import { usersReducer } from 'modules/users/users-reducers'

import { ATHLETS_STATE } from 'modules/athlets/athlets-constants'
import { athletsReducer } from 'modules/athlets/athlets-reducers'

import { SIDENAV_STATE } from 'modules/sidenav/sidenav-constants'
import { sideNavReducer } from 'modules/sidenav/sidenav-reducers'

import { PLANS_STATE } from 'modules/plans/plans-constants'
import { plansReducer } from 'modules/plans/plans-reducers'

import { LIBRARY_STATE } from 'modules/library/library-constants'
import { libraryReducer } from 'modules/library/library-reducers'

import { ONBOARDING_STATE } from 'modules/onboarding/onboarding-constants'
import { onboardingReducer } from 'modules/onboarding/onboarding-reducers'

import { PAYMENT_STATE } from 'modules/payment/payment-constants'
import { paymentReducer } from 'modules/payment/payment-reducers'

import { WORKOUTS_STATE } from 'modules/workouts/workouts-constants'
import { workoutsReducer } from 'modules/workouts/workouts-reducer'

import { FEET_STATE } from 'modules/feet/feet-constants'
import { feetReducers } from 'modules/feet/feet-reducers'

import { SUBSCRIPTIONS_STATE } from 'modules/subscriptions/subscriptions-constants'
import { subscriptionsReducer } from 'modules/subscriptions/subscriptions-reducers'

import { MARKETING_STATE } from 'modules/marketing/constants'
import { marketingReducer } from 'modules/marketing/reducers'

import { CHAT_STATE } from 'modules/chat/chat-constants'
import { chatReducer } from 'modules/chat/chat-reducers'

import { PAGE_STATE } from 'modules/page/page-constants'
import { pageReducer } from 'modules/page/page-reducers'

const reducersObject = {
  main: {
    [LOGIN_STATE]: loginReducer,
    [USERS_STATE]: usersReducer,
    [ATHLETS_STATE]: athletsReducer,
    [SIDENAV_STATE]: sideNavReducer,
    [SESSION_STATE]: sessionReducer,
    [PLANS_STATE]: plansReducer,
    [LIBRARY_STATE]: libraryReducer,
    [ONBOARDING_STATE]: onboardingReducer,
    [PAYMENT_STATE]: paymentReducer,
    [WORKOUTS_STATE]: workoutsReducer,
    [SUBSCRIPTIONS_STATE]: subscriptionsReducer,
    [CHAT_STATE]: chatReducer,
    [PAGE_STATE]: pageReducer,
  },
  feet: {
    [FEET_STATE]: feetReducers,
  },
  marketing: {
    [MARKETING_STATE]: marketingReducer,
  },
}

const createReducer = asyncReducers =>
  combineReducers({
    ...asyncReducers,
    ...(reducersObject[process.env.NAME] || reducersObject.main),
  })

export default createReducer
