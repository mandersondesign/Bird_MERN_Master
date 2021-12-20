const { defineProperty } = Object

/**
 * @typedef { function(*, Object, PropertyKey): boolean } PropValidator
 */

/**
 * @typedef { function(target: Object, prop: string, value: *): boolean } Descriptor
 */

/**
 * @typedef { string | Descriptor } Description
 */

/**
 * @typedef { Object } Described
 * @property { Description } description
 */

/**
 * @typedef { PropValidator & Described } DescribedPropValidator
 */

/**
 * @param { PropValidator } func
 * @param { Description } description
 *
 * @return { DescribedPropValidator }
 */
function validator (func, description) {
  return defineProperty(func, 'description', { value: description })
}

export default validator
