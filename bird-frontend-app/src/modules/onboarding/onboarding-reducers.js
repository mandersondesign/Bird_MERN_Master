import { ONBOARDING_START, ONBOARDING_SUBMIT, ONBOARDING_SUBMIT_FAILURE, ONBOARDING_SUBMIT_SUCCESS, ONBOARDING_UPDATE, ONBOARDING_AVATAR_START, ONBOARDING_AVATAR_SUCCESS, ONBOARDING_AVATAR_FAIL } from './onboarding-constants'

export const onboardingInitialState = {
  info: {
    about: '',
    images: '',
    specialties: [''],
  },
  loading: false,
  completed: false,
  error: null,
}

export const onboardingReducer = (state = onboardingInitialState, { type, payload }) => {
  switch (type) {
  case ONBOARDING_START:
    return { ...state, completed: false }
  case ONBOARDING_UPDATE:
    return { ...state, info: payload.info }
  case ONBOARDING_SUBMIT_FAILURE:
    return { ...state, error: payload.error }
  case ONBOARDING_SUBMIT_SUCCESS:
    return { ...state, info: payload.info }
  case ONBOARDING_SUBMIT:
    return { ...state, completed: true }
  case ONBOARDING_AVATAR_START:
    return { ...state, loading: true }
  case ONBOARDING_AVATAR_SUCCESS:
    return { ...state, images: payload.avatar, completed: true }
  case ONBOARDING_AVATAR_FAIL:
    return { ...state, error: payload.error }
  default:
    return state
  }
}
