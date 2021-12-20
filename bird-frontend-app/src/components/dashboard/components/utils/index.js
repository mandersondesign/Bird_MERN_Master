import moment from 'moment'

export const sortMessages = messageArray => {
  const compareFunc = (a, b) =>
    moment(b.date).valueOf() - moment(a.date).valueOf()

  return messageArray.sort(compareFunc)
}

export const getMessagesByWeek = messageArray => {
  if (messageArray.length === 0) return messageArray
  const startDate = messageArray[0].date
  const lastDate = messageArray[messageArray.length - 1].date

  let currentDate = startDate
  const messagesByWeek = []

  while (moment(currentDate).isSameOrAfter(lastDate)) {
    const startOfWeek = moment(currentDate)
      .subtract(7, 'days')
      .format()

    const weekMessages = messageArray.filter(message =>
      moment(message.date).isBetween(startOfWeek, currentDate, undefined, '[]'),
    )
    if (weekMessages.length > 0) {
      messagesByWeek.push(weekMessages)
    }
    currentDate = moment(currentDate)
      .subtract(7, 'days')
      .format()
  }
  return messagesByWeek
}
export const inserWorkout = (messages, athleteWorkouts) => {
  return messages.map(msg => {
    const dayWorkout = athleteWorkouts.find(workout =>
      moment(workout.date).isSame(msg.date, 'day'),
    )

    if (dayWorkout) {
      return {
        ...msg,
        isDone: true,
        workout: { ...dayWorkout },
      }
    }
    return { ...msg, isDone: true }
  })
}
