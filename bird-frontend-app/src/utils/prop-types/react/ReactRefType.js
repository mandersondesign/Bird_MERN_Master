import { any, shape } from 'prop-types'
import CustomType from 'utils/prop-types/CustomType'

/**
 * Creates custom property checker.
 *
 * @return { Function }
 */
const ReactRefType = CustomType((props, propName, componentName, ...rest) => {
  if (shape({ current: any })(props, propName, componentName, ...rest) != null) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a valid forwarded ref.`)
  }

  return null
})

export default ReactRefType
