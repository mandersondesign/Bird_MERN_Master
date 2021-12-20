import { ONBOARDING_START, ONBOARDING_SUBMIT, ONBOARDING_SUBMIT_FAILURE, ONBOARDING_SUBMIT_SUCCESS, ONBOARDING_UPDATE, ONBOARDING_AVATAR_START, ONBOARDING_AVATAR_SUCCESS, ONBOARDING_AVATAR_FAIL } from './onboarding-constants'
import { UPDATE_USER_AVATAR } from '../session/session-constants'
import { coaches, users, subscriptions } from 'api'
import { notification } from 'antd'

export const onBoardingStart = () => ({
  type: ONBOARDING_START,
})

export const onBoardingUpdate = payload => ({
  type: ONBOARDING_UPDATE,
  payload,
})

export const onBoardingSubmit = payload => ({
  type: ONBOARDING_SUBMIT,
  payload,
})

export const onBoardingFailure = payload => ({
  type: ONBOARDING_SUBMIT_FAILURE,
  payload,
})

export const onBoardingSubmitSuccess = () => ({
  type: ONBOARDING_SUBMIT_SUCCESS,
})

export const onBoardingAvatarStart = () => ({
  type: ONBOARDING_AVATAR_START,
})

export const onBoardingAvatarSuccess = payload => ({
  type: ONBOARDING_AVATAR_SUCCESS,
  payload,
})

export const onBoardingAvatarFail = payload => ({
  type: ONBOARDING_AVATAR_FAIL,
  payload,
})

export const onBoardingFirstStep = (step, data) => dispatch => coaches.addInfoStepFirst(step, data)
  .then(({ data }) => {
    if (data?.message === 'OK') {
      return true
    }
  })
  .catch(err => {
    const message = err?.response?.data?.error
    notification.error({ message: message || '' })
    return 'error'
  })

export const getInfo = id => dispatch => coaches.getInfo(id)
  .then(res => {
    dispatch(onBoardingUpdate(res.data))
  })
  .catch(err => {
    const message = err?.response?.data?.error
    notification.error({ message: message || '' })
  })

export const uploadAvatar = img => dispatch => {
  dispatch({ type: UPDATE_USER_AVATAR, payload: { avatar: '', loading: true } })
  users.postAvatar(img)
    .then(res => {
      dispatch({ type: UPDATE_USER_AVATAR, payload: { avatar: res?.data?.avatar, loading: false } })
      const response = dispatch(onBoardingAvatarSuccess(res?.data?.avatar))
      return response
    })
    .catch(err => {
      dispatch(onBoardingAvatarFail(err))
      const message = err?.response?.data?.error
      notification.error({ message: message || '' })
    })
}

export const subscriptionPlan = data => dispatch => subscriptions.subscriptionPlan(data)
  .catch(err => {
    const message = err?.response?.data?.error
    notification.error({ message: message || '' })
    return 'error'
  })

export const deleteSpecialities = payload => ({
  type: ONBOARDING_UPDATE,
  payload,
})
