import history from './router-history'

/**
 * @param { string } path
 */
export function push (path) {
  return history.push(path)
}

/**
 * @param { string } path
 */
export function replace (path) {
  return history.replace(path)
}
