/**
 * Checks if the given prop is prefixed by the specified prefix.
 *
 * @param { string } prop
 * @param { string } prefix
 *
 * @return { boolean }
 */
const isPrefixed = (prop, prefix) => prop.startsWith(`${prefix}-`)

export default isPrefixed
