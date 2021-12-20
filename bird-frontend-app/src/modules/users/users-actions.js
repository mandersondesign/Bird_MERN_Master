import { users } from 'api'

import { USERS_START, USERS_SUBMIT, USERS_SUBMIT_FAILURE, USERS_SUBMIT_SUCCESS, USERS_UPDATE, USERS_GET_USER } from './users-constants'

export const usersStart = () => ({
  type: USERS_START,
})

export const usersUpdateAction = payload => ({
  type: USERS_UPDATE,
  payload,
})

export const usersSubmitAction = payload => ({
  type: USERS_SUBMIT,
  payload,
})

export const usersSubmitSuccessAction = () => ({
  type: USERS_SUBMIT_SUCCESS,
})

export const usersSubmitFailureAction = error => ({
  type: USERS_SUBMIT_FAILURE,
  payload: error,
})

export const getUserAction = payload => ({
  type: USERS_GET_USER,
  payload,
})

// export const getUsersStart = () => dispatch => {
//   dispatch(
//     batchActions([
//       busy(true),
//       defaultError()
//     ])
//   );
// };
//
// export const getUsersSuccess = results => dispatch => {
//   dispatch(
//     batchActions([
//       busy(false),
//       changeRoot('results', results)
//     ])
//   );
// };
//
// export const getUsersFailure = errors => dispatch => {
//   dispatch(
//     batchActions([
//       busy(false),
//       defaultError(errors)
//     ])
//   );
// };

export const getUser = id => dispatch => users.getUser(id)
  .then(({ data }) => {
    dispatch(getUserAction(data))
  })
  .catch(() => {})

export const getUsers = (page, query = '') => dispatch => users.getUsers(page, query)
  .then(({ data }) => {
    dispatch(usersUpdateAction(data || []))
    return data
  })
  .catch(() => {})
