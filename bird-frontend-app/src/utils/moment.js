import moment from 'moment-timezone'

export const setDefaultTimezone = timezone => moment.tz.setDefault(timezone)

export const convertToZone = (date, timezone) => moment(date).tz(timezone)

export const momentDate = date => moment(date)

export const dateFormat = date => {
  const getDate = date ? moment(date) : moment()

  return getDate.format('M/DD/YYYY')
}

export const timeFormat = date => {
  const getTime = date ? moment(date) : moment()

  return getTime.format('h:mm A')
}

const dateFormatter = {
  lastDay: '[Yesterday], h:mm A',
  sameDay: '[Today], h:mm A',
  sameElse: 'M/DD/YYYY, h:mm A',
  nextDay: 'M/DD/YYYY, h:mm A',
  lastWeek: 'M/DD/YYYY, h:mm A',
  nextWeek: 'M/DD/YYYY, h:mm A',
}

export const fullTimeFormat = date => {
  const getDate = date ? moment(date) : moment()

  return getDate.calendar(null, dateFormatter)
}
