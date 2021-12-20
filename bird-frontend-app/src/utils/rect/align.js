import {
  BOTTOM_BOTTOM,
  BOTTOM_MIDDLE,
  BOTTOM_TOP,
  CENTER_CENTER,
  CENTER_LEFT,
  CENTER_RIGHT,
  LEFT_CENTER,
  LEFT_LEFT,
  LEFT_RIGHT,
  MIDDLE_BOTTOM,
  MIDDLE_MIDDLE,
  MIDDLE_TOP,
  RIGHT_CENTER,
  RIGHT_LEFT,
  RIGHT_RIGHT,
  TOP_BOTTOM,
  TOP_MIDDLE,
  TOP_TOP,
} from './align-sides'

/**
 * @param { Bounds } bounds
 * @param { Size } size
 * @param { string } side
 *
 * @return { BoundsLike }
 */
export function alignSide (bounds, size, side) {
  switch (side) {
  // left
  case LEFT_LEFT:
  case LEFT_CENTER:
  case LEFT_RIGHT:
    return { left: bounds[side] }

    // center
  case CENTER_LEFT:
    return { left: bounds.left - size.center }
  case CENTER_CENTER:
    return { left: bounds[LEFT_CENTER] - size.center }
  case CENTER_RIGHT:
    return { right: bounds.right - size.center }

    // right
  case RIGHT_LEFT:
  case RIGHT_CENTER:
  case RIGHT_RIGHT:
    return { right: bounds[side] }

    // top
  case TOP_TOP:
  case TOP_MIDDLE:
  case TOP_BOTTOM:
    return { top: bounds[side] }

    // middle
  case MIDDLE_TOP:
    return { top: bounds.top - size.middle }
  case MIDDLE_MIDDLE:
    return { top: bounds[TOP_MIDDLE] - size.middle }
  case MIDDLE_BOTTOM:
    return { bottom: bounds.bottom - size.middle }

    // bottom
  case BOTTOM_TOP:
  case BOTTOM_MIDDLE:
  case BOTTOM_BOTTOM:
    return { bottom: bounds[side] }

  default:
    return null
  }
}

/**
 * @param { Bounds } bounds
 * @param { Size } size
 * @param { string } alignString
 *
 * @return { Object }
 */
export function align (bounds, size, alignString) {
  return alignString.split(/\s+/).reduce((sides, side) => ({ ...sides, ...alignSide(bounds, size, side) }), {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  })
}
