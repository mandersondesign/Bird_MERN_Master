import { isValidElementType } from 'react-is'
import CustomType from 'utils/prop-types/CustomType'

/**
 * Creates custom property checker.
 *
 * @return { Function }
 */
const ReactElementType = CustomType((props, propName, componentName) => {
  const { [propName]: value } = props

  if (!isValidElementType(value)) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a valid element type.`)
  }

  return null
})

export default ReactElementType
