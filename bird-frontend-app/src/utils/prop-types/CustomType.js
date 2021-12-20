const { assign } = Object

const checkPropType = (checker, isRequired, props, propName, componentName, ...rest) => {
  const { [propName]: value } = props

  if (value == null) {
    return isRequired
      ? new Error(
        `Failed prop type: The prop \`${propName}\` is marked as required in \`${componentName}\`, ` +
            `but its value is \`${value}\`.\n`,
      )
      : null
  }

  return checker(props, propName, componentName, ...rest)
}

/**
 * Creates custom property checker.
 *
 * @param { Function } checker
 *
 * @return { Function }
 */
function CustomType (checker) {
  return assign(checkPropType.bind(null, checker, false), {
    isRequired: checkPropType.bind(null, checker, true),
  })
}

export default CustomType
