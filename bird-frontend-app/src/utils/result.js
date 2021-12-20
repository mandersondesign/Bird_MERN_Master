const { isFunction } = require('lodash')

/**
 * Returns result of invocation of `maybeFunc` if it is a function or `maybeFunc` otherwise.
 *
 * @param { function | * } maybeFunc - Value or function
 * @param { ...* } args - The arguments to invoke 'maybeFunc' with
 */
function result (maybeFunc, ...args) {
  return isFunction(maybeFunc) ? maybeFunc(...args) : maybeFunc
}

export default result
