/**
 * @param { PropertyKey } prop
 *
 * @return { string }
 */
function getPropName (prop) {
  return typeof prop === 'symbol' ? prop.description : String(prop)
}

export default getPropName
