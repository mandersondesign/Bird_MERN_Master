export const parseMovingTime = (time = '') => {
  if (!time) {
    return '00:00'
  }
  const [f = '0', s = '0'] = time.split(' ')
  const transformLength = n => {
    return n.toString().length < 2 ? '0' + n : n
  }
  let hours = '00'
  let minutes = hours
  if (f.lastIndexOf('h') > 0) {
    hours = transformLength(parseInt(f, 10))
    minutes = transformLength(parseInt(s, 10))
  } else {
    minutes = transformLength(parseInt(f, 10))
  }
  return `${hours}:${minutes}`
}
