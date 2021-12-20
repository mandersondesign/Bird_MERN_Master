import { USERS_START, USERS_SUBMIT, USERS_SUBMIT_FAILURE, USERS_SUBMIT_SUCCESS, USERS_UPDATE, USERS_GET_USER } from './users-constants'

export const usersInitialState = {
  user: {},
  users: [],
  meta: {},
  token: null,
  loading: {
    login: false,
    currentUser: false,
  },
  errors: null,
}

export const usersReducer = (state = usersInitialState, { type, payload }) => {
  switch (type) {
  case USERS_START:
    return { ...state, busy: true }
  case USERS_UPDATE:
    return { ...state, users: payload.data.users, meta: payload.meta }
  case USERS_SUBMIT:
    return payload
  case USERS_SUBMIT_SUCCESS:
    return state
  case USERS_SUBMIT_FAILURE:
    return payload
  case USERS_GET_USER:
    return { ...state, user: payload.data.user }
  default:
    return state
  }
}
