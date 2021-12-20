import isClass from 'utils/isClass'
import CustomType from 'utils/prop-types/CustomType'

const ClassType = Class =>
  CustomType((props, propName, componentName) => {
    const { [propName]: value } = props

    if (!isClass(value, Class)) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected class \`${Class.name}\`.`,
      )
    }

    return null
  })

export default ClassType
