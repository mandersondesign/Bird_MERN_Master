import { validator } from 'utils/props'

/**
 * @param { * } value
 * @return { boolean }
 */
export const isNumberLike = validator(value => value == null || Number.isFinite(value), '?number')

/**
 * @param { ?number } value1
 * @param { ?number } value2
 */
export function add (value1, value2) {
  return value1 == null || value2 == null ? null : value1 + value2
}

/**
 * @param { ?number } value1
 * @param { ?number } value2
 *
 * @return { ?number }
 */
export function min (value1, value2) {
  return value1 == null || value2 == null ? null : Math.min(value1, value2)
}

/**
 * @param { ?number } value1
 * @param { ?number } value2
 *
 * @return { ?number }
 */
export function max (value1, value2) {
  return value1 == null || value2 == null ? null : Math.max(value1, value2)
}

/**
 * @param { ?number } value
 * @param { ?number } min
 * @param { ?number } max
 *
 * @return { ?number }
 */
export function clamp (value, min, max) {
  let clamped = value

  if (clamped == null) {
    return clamped
  }

  if (min != null) {
    clamped = Math.max(clamped, min)
  }

  if (max != null) {
    clamped = Math.min(clamped, max)
  }

  return clamped
}

/**
 * @param { ?number } value1
 * @param { ?number } value2
 *
 * @return { ?number }
 */
export function mul (value1, value2) {
  return value1 == null || value2 == null ? null : value1 * value2
}

/**
 * @param { ?number } value1
 * @param { ?number } value2
 *
 * @return { ?number }
 */
export function div (value1, value2) {
  return value1 == null || value2 == null ? null : value1 / value2
}

/**
 * @param { ?number } value
 */
export function neg (value) {
  return value === null ? value : -value
}

/**
 * @param { ?number } value
 *
 * @return { ?number }
 */
export function round (value) {
  return value == null ? value : Math.round(value)
}

/**
 * @param { ?number } value1
 * @param { ?number } value2
 *
 * @return { ?number }
 */
export function sub (value1, value2) {
  return value1 == null || value2 == null ? null : value1 - value2
}
