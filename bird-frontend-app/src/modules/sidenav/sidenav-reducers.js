import { SIDENAV_SET, SIDENAV_SEARCH, SIDENAV_WORKOUTS_SEARCH, SIDENAV_IS_MOBILE, SIDENAV_IS_MENU } from './sidenav-constants'

const sideNavInitialState = {
  items: {
    athletes: [
      {
        name: 'All Athletes',
        amount: 0,
      },
      {
        name: 'Unassigned',
        amount: 0,
      },
    ],
    plans: [],
  },
  search: '',
  workoutId: null,
  isMobile: false,
  isMenu: false,
}

export const sideNavReducer = (state = sideNavInitialState, { type, payload }) => {
  switch (type) {
  case SIDENAV_SET:
    return { ...state, items: { ...payload } }
  case SIDENAV_SEARCH:
    return { ...state, search: payload }
  case SIDENAV_WORKOUTS_SEARCH:
    return { ...state, workoutId: payload }
  case SIDENAV_IS_MOBILE:
    return { ...state, isMobile: payload }
  case SIDENAV_IS_MENU:
    return { ...state, isMenu: payload }
  default:
    return state
  }
}
