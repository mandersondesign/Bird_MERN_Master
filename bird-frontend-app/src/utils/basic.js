import { notification } from 'antd'
import moment from 'moment'
import { filter, throttle } from 'lodash'
import { useLocation } from 'react-router-dom'

export const year = () => moment().format('YYYY')

export const formatLabelDate = date =>
  moment(new Date(date)).format('dddd, MMMM D, YYYY HH:mm')

export const openNotification = (
  type,
  { message, description, duration = 5 },
) =>
  notification[type]({
    message,
    description,
    duration,
  })

export const isEmptyObject = object => Object.keys(object).length === 0

export const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}

export const admin = 'Admin'
export const athlete = 'Athlete'
export const coach = 'Coach'

export const getByRole = (userRole, listOfArray) => {
  let condition = { athlete: true }
  switch (userRole?.name) {
  case admin:
    condition = { admin: true }
    break
  case coach:
    condition = { coach: true }
    break
  default:
    condition = { athlete: true }
  }

  const filterItems = listOfArray.map(item =>
    item?.items ? { ...item, items: filter(item.items, condition) } : item,
  )
  return filter(filterItems, condition)
}

// export const isSysAdmin = (userRole) => userRole?.roleId === 1 || userRole?.title === sysAdmin;
export const getFirstLoadUrl = user => {
  const isOnboardingCompleted = isCoach(user) && user?.isOnboardingCompleted
  return isOnboardingCompleted
    ? '/plan_template/0/athletes'
    : isAdmin(user)
      ? '/users'
      : '/steps/1'
}
export const normalizePhoneNumber = phone => {
  phone = phone.replace(/[^\d]/g, '')
  return phone
}
export const formatPhoneNumber = phoneNumberString => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1})?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return ['+', match[1], match[2], '-', match[3], '-', match[4]].join('')
  }
  return cleaned
}

export const isAdmin = userRole =>
  userRole?.userTypeId === 1 || userRole?.name === admin

export const isAthlete = userRole =>
  userRole?.userTypeId === 3 || userRole?.name === athlete

export const isCoach = userRole =>
  userRole?.userTypeId === 2 || userRole?.name === coach

export const statuses = [
  { isActive: false, title: 'Disabled' },
  { isActive: true, title: 'Enabled' },
]

export const permissions = [
  {
    userTypeId: 1,
    title: admin,
    admin: true,
    athlete: false,
    coach: false,
    isHidden: false,
  },
  {
    userTypeId: 3,
    title: athlete,
    admin: true,
    athlete: true,
    coach: false,
    isHidden: false,
  },
  {
    userTypeId: 2,
    title: coach,
    admin: true,
    athlete: true,
    coach: true,
    isHidden: false,
  },
]

export const getPermissions = userRole => getByRole(userRole, permissions)

export const getAllPermissions = () =>
  permissions.filter(role => {
    return !role.isHidden
  })

export const getRoleTitleById = userTypeId =>
  getAllPermissions().filter(role => {
    return role.userTypeId === userTypeId
  })

export const getAllNotReadyCustodians = custodians =>
  custodians.filter(custodian => {
    return custodian.status.label !== 'Complete'
  })

export const throttledAction = fn => {
  return throttle(fn, 300, { trailing: false })
}

export const showError = err => {
  const message = err?.response?.data?.error
  notification.error({ message })
}

export const showSuccess = message => notification.success({ message })

export const timeFormat = seconds => {
  const H = 3600
  const M = 60

  const h = Math.floor(seconds / H)
  const m = Math.floor((seconds % H) / M)
  const s = Math.round(seconds % M)

  if (h) {
    return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
  }

  return `${m}:${s < 10 ? '0' + s : s}`
}

export const useQuery = () => new URLSearchParams(useLocation().search)
