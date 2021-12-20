import result from 'utils/result'
import getPropName from './getPropName'

const { defineProperty, freeze } = Object

/**
 * Defines frozen read-only property
 *
 * @param { Object } target - Target
 * @param { PropertyKey } prop - Property name or symbol
 * @param { * } value - Value
 * @param { ...(PropValidator | DescribedPropValidator) } validators - PropValidators to check `value`
 *
 * @return { Object }
 */
function setProp (target, prop, value, ...validators) {
  validators.forEach(validator => {
    const isValid = validator(value, target, prop)

    if (!isValid) {
      const propName = getPropName(prop)
      const { description } = validator

      let message = `${target.constructor.name}: invalid property \`${propName}\``

      if (description) {
        message += `, expected ${result(description, target, propName, value)}`
      }

      throw new TypeError(message)
    }
  })

  return defineProperty(target, prop, { value: freeze(value) })
}

export default setProp
