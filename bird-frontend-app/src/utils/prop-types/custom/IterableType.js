import CustomType from 'utils/prop-types/CustomType'

function isIterable (value) {
  return value != null && typeof value.entries === 'function'
}

const IterableType = Type =>
  CustomType((props, propName, componentName, location, propFullName, ...rest) => {
    const { [propName]: value } = props
    let error = null

    if (typeof Type !== 'function') {
      return new Error(`Property \`${propFullName}\` of component \`${componentName}\` has invalid Type notation.`)
    }

    if (!isIterable(value)) {
      const propType = typeof value

      return new Error(
        `Invalid ${location} \`${propFullName}\` of type \`${propType}\` supplied to \`${componentName}\`, ` +
          'expected an iterable object.',
      )
    }

    [...value.entries()].forEach(keyVal => {
      if (error == null) {
        error = Type(keyVal, 1, componentName, location, `${propName} → ${JSON.stringify(keyVal[0])}`, ...rest)
      }
    })

    return error
  })

export default IterableType
