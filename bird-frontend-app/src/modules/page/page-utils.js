import moment from 'moment'

export const defaultSortType = {
  name: 'messages',
  title: 'Latest Messages ',
  direction: 'desc',
}

export const sortAthletes = ({ athletes, sortItem }) => {
  const order = sortItem.direction === 'asc' ? 1 : -1
  switch (sortItem.name) {
  case 'name': {
    const compareFunction = (a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return order * 1
      }
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return order * -1
      }
      return 0
    }
    return athletes.sort(compareFunction)
  }
  case 'activity': {
    return sortByActivityDate(athletes, order)
  }
  case 'messages': {
    return sortByMessageDate(athletes, order)
  }
  default:
    break
  }
}

export const sortByActivityDate = (athletes, order) => {
  const compareFunc = (a, b) => {
    const firstActivityDate = a.lastActivity
      ? moment(a.lastActivity).valueOf()
      : 0
    const secondActivityDate = b.lastActivity
      ? moment(b.lastActivity).valueOf()
      : 0
    return order * (firstActivityDate - secondActivityDate)
  }

  return athletes.sort(compareFunc)
}

export const sortByMessageDate = (athletes, order) => {
  const recentMessaged = athletes.filter(athlete => athlete.hasNewMessage)
  const alreadyRead = athletes.filter(athlete => !athlete.hasNewMessage)

  const compareFunc = (a, b) => {
    const firstDate =
      !a?.lastMessage?.date || a?.lastMessage?.text === ''
        ? 0
        : moment(a?.lastMessage?.date).valueOf()

    const secondDate =
      !b?.lastMessage?.date || b?.lastMessage?.text === ''
        ? 0
        : moment(b?.lastMessage?.date).valueOf()
    return order * (firstDate - secondDate)
  }

  return order === -1
    ? [...recentMessaged.sort(compareFunc), ...alreadyRead.sort(compareFunc)]
    : [...alreadyRead.sort(compareFunc), ...recentMessaged.sort(compareFunc)]
}

export const shiftAthletes = (allAthletes, senderAthlete) => {
  const filteredAllAthletes = allAthletes.filter(
    athlete => athlete.userId !== senderAthlete.userId,
  )
  filteredAllAthletes.unshift({ ...senderAthlete, hasNewMessage: true })

  return {
    filteredAllAthletes,
  }
}

export const getSenderAthlete = (currentAllAthletes, msg, athleteId) => {
  const newDate = moment().format()
  const senderAthlete = currentAllAthletes.find(
    athlete => athlete.userId === athleteId,
  )

  return {
    ...senderAthlete,
    lastMessage: {
      ...senderAthlete.lastMessage,
      text: msg,
      date: newDate,
    },
  }
}
