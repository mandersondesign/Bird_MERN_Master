import React, { useState, useEffect } from 'react'
import { EcoForm, EcoFormInput, Select } from 'components'
import {
  openNotification,
  statuses,
  permissions,
  throttledAction,
  formatPhoneNumber,
} from 'utils/basic'
import { users } from 'api'
import { Header } from '../../components'
import { Button } from 'components/CustomButton'
import { getUserTitle } from '../../utils'
import _, { head, isNull, uniq } from 'lodash'
import css from './index.less'
import { push } from 'modules/router'
import { fetchSubscriptionsForAdmins } from 'modules/subscriptions/subscriptions-actions'
import { useDispatch, useSelector } from 'react-redux'

const EditUser = ({
  history,
  users: { user = {} },
  getUser,
  match: {
    params: { userID = null },
  },
}) => {
  const [editUser, setEditUser] = useState({})
  const [userRole, setUserRole] = useState()
  const [userTypeId, setUserTypeId] = useState()
  const [isActive, setIsActive] = useState(true)
  const [activePlan, setActivePLan] = useState({})
  const { adminsPlans: subscription } = useSelector(({ subscriptions }) => subscriptions)
  const dispatch = useDispatch()

  const onFormSubmit = throttledAction(({ errors, fields, onFailure }) => {
    if (isNull(errors)) {
      const phone = fields.phone.toString()
      if (_.includes(fields.phone, '_')) {
        onFailure({
          errors: {
            phone: {
              phone: 'Phone contain wrong format',
            },
          },
        })
        return
      }
      const [firstName, lastName] = fields.Fullname.trim().split(' ')

      const data = {
        firstName: firstName,
        lastName: lastName,
        phone: formatPhoneNumber(phone) || '+' + phone,
        email: fields.email,
        userTypeTitle: fields.userTypeTitle,
        userTypeId: userTypeId || 2,
        isActive: isActive ?? true,
      }

      if (user?.userTypeId === 2) {
        data.coachPlanId = activePlan.coachPlanId
      }

      if (!userID) {
        data.password = fields.Password
      }

      const request = userID
        ? users.updateUser(userID, data)
        : users.createUser(data)

      request
        .then(() => {
          openNotification('success', {
            message: 'Success',
            description: userID
              ? 'You have successfully updated user!'
              : 'You have successfully created user!',
          })

          history.replace('/users')
        })
        .catch(err =>
          openNotification('error', {
            message: 'Error',
            description: (err?.response?.data?.error || err).toString(),
          }),
        )
    }
  })

  const onChangeUserStatus = () => {
    setIsActive(!isActive)
  }

  const onChangeUserPlan = planName => {
    const plan = subscription?.find(({ name }) => name === planName)
    setActivePLan(plan)
  }

  const onChangeRoleUserStatus = userRole => {
    const { userTypeId } = head(permissions.filter(({ title }) => title === userRole))
    setUserRole(userRole)
    setUserTypeId(userTypeId)
  }

  const onChange = () => {
    push('/users')
  }

  useEffect(() => {
    dispatch(fetchSubscriptionsForAdmins(true))
  }, [])

  useEffect(() => {
    if (userID) getUser(userID)
    if (user?.coachPlan?.coachPlanId) {
      const plan = subscription?.find(i => i.coachPlanId === user?.coachPlan?.coachPlanId)
      setActivePLan(plan)
    } else if (subscription?.length) {
      setActivePLan(subscription[0])
    }
  }, [subscription.length])

  useEffect(() => {
    const url = window.location.pathname.split('/')[3]
    setEditUser(url === 'edit' ? user : {})
    setIsActive(user?.isActive)
    if (user?.coachPlan?.coachPlanId) {
      const plan = subscription?.find(i => i.coachPlanId === user?.coachPlan?.coachPlanId)
      setActivePLan(plan)
    } else if (subscription.length) {
      setActivePLan(subscription[0])
    }
  }, [user])

  return (
    <div className={css.wrapperEditUser}>
      <Header title='My Athletes' admin />
      <div className={css.rootHeader}>
        <div className={css.rootTitle}>{userID ? 'Update' : 'Create'} User</div>
      </div>

      <div className={css.body}>
        <EcoForm onSubmit={onFormSubmit} className={css.form}>
          <div className={css.formInput}>
            <EcoFormInput
              options={{
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Last Name can not be empty.',
                  },
                  {
                    max: 32,
                    message: 'Last Name should be less than 32 characters.',
                  },
                  { transform: value => value.trim() },
                ],
                initialValue: editUser?.name || '',
              }}
              autoComplete='off'
              placeholder='Full name'
              name='Fullname'
            />
          </div>

          <div className={css.formInput}>
            <EcoFormInput
              options={{
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Email can not be empty.',
                  },
                  {
                    max: 160,
                    message: 'Email should be less than 160 characters.',
                  },
                  { transform: value => value.trim() },
                ],
                initialValue: editUser?.email || '',
              }}
              type='email'
              autoComplete='off'
              placeholder='Email'
              name='email'
            />
          </div>

          <div className={css.formInput}>
            <EcoFormInput
              options={{
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Phone can not be empty.',
                  },
                ],
                initialValue: editUser?.phone || '',
              }}
              autoComplete='off'
              mask='phone'
              placeholder='Phone'
              name='phone'
            />
          </div>

          {!userID && (
            <div className={css.formInput}>
              <EcoFormInput
                type='password'
                options={{
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: 'Password can not be empty.',
                    },
                  ],
                  initialValue: '',
                }}
                autoComplete='off'
                placeholder='Password'
                name='Password'
              />
            </div>
          )}

          <div className={[css.formInput, css.doubleItems].join(' ')}>
            <Select
              className={css.autoComplete}
              placeholder='Choose status'
              value={isActive ? 'Enabled' : 'Disabled'}
              dataSource={statuses.map(o => ({ label: o.title }))}
              onChange={onChangeUserStatus}
            />

            {userID
              ? (
                <EcoFormInput
                  options={{ initialValue: getUserTitle(user?.userTypeId) || '' }}
                  autoComplete='off'
                  disabled
                  placeholder=''
                  name='userTypeTitle'
                />
              )
              : (
                <Select
                  placeholder='User type'
                  value={userRole || 'Coach'}
                  dataSource={uniq(
                    permissions.map(o => ({ ...o, label: o.title })),
                  )}
                  onChange={onChangeRoleUserStatus}
                />
              )}
          </div>

          {user?.userTypeId === 2 && (
            <div className={css.formInput}>
              <Select
                className={css.autoComplete}
                placeholder={user?.coachPlan?.name || 'Choose plan'}
                value={activePlan?.name}
                dataSource={uniq(
                  subscription.map(o => ({ ...o, label: o.name })),
                )}
                onChange={onChangeUserPlan}
              />
            </div>
          )}

          <div className={css.buttons}>
            <Button
              size={Button.SIZE_LARGE}
              face={Button.FACE_SECONDARY}
              htmlType='button'
              onClick={onChange}
            >
              Cancel
            </Button>
            <Button
              size={Button.SIZE_LARGE}
              face={Button.FACE_PRIMARY}
              key='submit'
              htmlType='submit'
            >
              {userID ? 'UPDATE' : 'CREATE'}
            </Button>
          </div>
        </EcoForm>
      </div>
    </div>
  )
}

export default EditUser
