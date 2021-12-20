import CustomType from './CustomType'

/**
 * Converts passed `Type` to unrequired.
 *
 * @param { Function } Type
 *
 * @return { Function }
 */
const UnrequiredType = Type =>
  CustomType((props, propName, componentName, ...rest) => {
    if (typeof Type !== 'function') {
      return new Error(`Property \`${propName}\` of component \`${componentName}\` has invalid Type notation.`)
    }

    return props[propName] == null ? null : Type(props, propName, componentName, ...rest)
  })

export default UnrequiredType
