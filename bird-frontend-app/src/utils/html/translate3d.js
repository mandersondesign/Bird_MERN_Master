/**
 * @typedef { Object } StyleWithTransform
 * @property { string } transform
 * @property { string } WebkitTransform
 */

/**
 * @param { number } value
 * @return { string }
 */
function toPx (value) {
  const numberValue = +value || 0

  return numberValue.toPrecision() + (numberValue === 0 ? '' : 'px')
}

/**
 * Adds transform to the provided style props
 *
 * @param { Object } style
 * @param { string } transform
 *
 * @return { StyleWithTransform }
 */
function transform (style, transform) {
  const nextTransform = (style.transform ? `${style.transform} ` : '') + transform

  return { ...style, transform: nextTransform, WebkitTransform: nextTransform }
}

/**
 * Append translate3d transformation to the provided style
 *
 * @param { Object } props - Style props
 *
 * @return { StyleWithTransform }
 */
export default function translate3d (props) {
  const style = { ...props }
  const translate = []

  if (style.left != null) {
    translate[0] = style.left
    style.left = 0
  }

  if (style.top != null) {
    translate[1] = style.top
    style.top = 0
  }

  return translate.length ? transform(style, `translate3D(${toPx(translate[0])}, ${toPx(translate[1])}, 0)`) : props
}
