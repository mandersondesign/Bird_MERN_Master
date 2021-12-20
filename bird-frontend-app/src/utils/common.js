import { notification } from 'antd'
import moment from 'moment'
import { filter, throttle } from 'lodash'

export const year = () => moment().format('YYYY')

export const formatLabelDate = date => moment(new Date(date)).format('dddd, MMMM D, YYYY HH:mm')

export const openNotification = (type, { message, description, duration = 5 }) => notification[type]({
  message,
  description,
  duration,
})

export const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows(),
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

  const filterItems = listOfArray.map(item => item?.items ? { ...item, items: filter(item.items, condition) } : item)
  return filter(filterItems, condition)
}

// export const isSysAdmin = (userRole) => userRole?.roleId === 1 || userRole?.title === sysAdmin;

export const isAdmin = userRole => userRole?.userTypeId === 1 || userRole?.name === admin

export const isAthlete = userRole => userRole?.userTypeId === 3 || userRole?.name === athlete

export const isCoach = userRole => userRole?.userTypeId === 2 || userRole?.name === coach

export const statuses = [{ isActive: false, title: 'Disabled' }, { isActive: true, title: 'Enabled' }]

export const permissions = [
  { userTypeId: 1, title: admin, admin: true, athlete: false, coach: false, isHidden: false },
  { userTypeId: 2, title: athlete, admin: true, athlete: true, coach: false, isHidden: false },
  { userTypeId: 2, title: coach, admin: true, athlete: true, coach: true, isHidden: false },
]

export const getPermissions = userRole => getByRole(userRole, permissions)

export const getAllPermissions = () => permissions.filter(role => {
  return !role.isHidden
})

export const getRoleTitleById = userTypeId => getAllPermissions().filter(role => {
  return role.userTypeId === userTypeId
})

export const getAllNotReadyCustodians = custodians => custodians.filter(custodian => {
  return custodian.status.label !== 'Complete'
})

export function throttledAction (fn) {
  return throttle(fn, 1000, { trailing: false })
}
