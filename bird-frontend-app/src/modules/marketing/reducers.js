import { GET_PROGRAM, SET_USER, SET_PROGRAM, LOGOUT, UPDATE_USER } from './constants'

export const sessionInitialState = {
  program: {},
  user: {},
  token: null,
  plan: {},
}

export const marketingReducer = (state = sessionInitialState, action) => {
  const { type, payload } = action

  const obj = {
    [GET_PROGRAM]: { ...state, program: payload },
    [SET_USER]: { ...state, user: payload?.user, token: payload?.token },
    [SET_PROGRAM]: { ...state, plan: payload },
    [LOGOUT]: { ...state, user: {}, token: null, plan: {} },
    [UPDATE_USER]: {
      ...state,
      user: {
        ...state.user,
        email: payload?.email,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        phone: payload?.phone,
      },
    },
    default: state,
  }

  return obj[type] || obj.default
}
