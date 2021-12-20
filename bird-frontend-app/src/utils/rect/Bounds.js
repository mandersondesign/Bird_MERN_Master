import { omitBy } from 'lodash'
import { setProp, validator } from 'utils/props'
import { align } from './align'
import { add } from './math'
import { isPoint, Point } from './Point'
import { isSize, Size } from './Size'
import { getOffsetRect } from './utils'

import {
  BOTTOM_BOTTOM,
  BOTTOM_MIDDLE,
  BOTTOM_TOP,
  LEFT_CENTER,
  LEFT_LEFT,
  LEFT_RIGHT,
  RIGHT_CENTER,
  RIGHT_LEFT,
  RIGHT_RIGHT,
  TOP_BOTTOM,
  TOP_MIDDLE,
  TOP_TOP,
} from './align-sides'

/**
 * @typedef { Object } BoundsLike
 * @property { ?number } left
 * @property { ?number } top
 * @property { ?number } right
 * @property { ?number } bottom
 * @property { ?number } width
 * @property { ?number } height
 */

/**
 * @class
 * @property { Point } leftTop
 * @property { Point } rightBottom
 * @property { Size } size
 */
export class Bounds {
  /**
   * @param { * } value
   *
   * @return { boolean }
   */
  static isBounds (value) {
    return value instanceof this
  }

  /**
   * @param { BoundsLike | Bounds } value
   *
   * @return { Bounds }
   */
  static toBounds (value) {
    let bounds = value

    if (!this.isBounds(value)) {
      const { left, top, right, bottom, width, height } = value == null ? {} : value

      bounds = new Bounds(new Point(left, top), new Point(right, bottom), new Size(width, height))
    }

    return bounds
  }

  /**
   * @param { HTMLElement } element
   * @param { HTMLElement } [offsetElement]
   *
   * @return { Bounds }
   */
  static fromElement (element, offsetElement) {
    return this.toBounds(getOffsetRect(element, offsetElement))
  }

  /**
   * @return { ?number }
   */
  get left () {
    return this.leftTop.left
  }

  /**
   * @return { ?number }
   */
  get top () {
    return this.leftTop.top
  }

  /**
   * @return { ?number }
   */
  get right () {
    return this.rightBottom.left
  }

  /**
   * @return { ?number }
   */
  get bottom () {
    return this.rightBottom.top
  }

  /**
   * @return { ?number }
   */
  get [LEFT_LEFT] () {
    return this.left
  }

  /**
   * @return { ?number }
   */
  get [LEFT_CENTER] () {
    return add(this.left, this.size.center)
  }

  /**
   * @return { ?number }
   */
  get [LEFT_RIGHT] () {
    return add(this.left, this.size.width)
  }

  /**
   * @return { ?number }
   */
  get [TOP_TOP] () {
    return this.top
  }

  /**
   * @return { ?number }
   */
  get [TOP_MIDDLE] () {
    return add(this.top, this.size.middle)
  }

  /**
   * @return { ?number }
   */
  get [TOP_BOTTOM] () {
    return add(this.top, this.size.height)
  }

  /**
   * @return { ?number }
   */
  get [RIGHT_LEFT] () {
    return add(this.right, this.size.width)
  }

  /**
   * @return { ?number }
   */
  get [RIGHT_CENTER] () {
    return add(this.right, this.size.center)
  }

  /**
   * @return { ?number }
   */
  get [RIGHT_RIGHT] () {
    return this.right
  }

  /**
   * @return { ?number }
   */
  get [BOTTOM_TOP] () {
    return add(this.bottom, this.size.height)
  }

  /**
   * @return { ?number }
   */
  get [BOTTOM_MIDDLE] () {
    return add(this.bottom, this.size.middle)
  }

  /**
   * @return { ?number }
   */
  get [BOTTOM_BOTTOM] () {
    return this.bottom
  }

  /**
   * @param { Point } leftTop
   * @param { Point } rightBottom
   * @param { Size } size
   */
  constructor (leftTop, rightBottom, size) {
    setProp(this, 'leftTop', leftTop, isPoint)
    setProp(this, 'rightBottom', rightBottom, isPoint)
    setProp(this, 'size', size, isSize)
  }

  /**
   * @param { Point } leftTop
   * @param { Point } rightBottom
   * @param { Size } size
   *
   * @return { Rect }
   */
  update (leftTop, rightBottom, size) {
    return this.leftTop === leftTop && this.rightBottom === rightBottom && this.size === size
      ? this
      : new Bounds(leftTop, rightBottom, size)
  }

  /**
   * @param { HTMLElement } element
   * @param { HTMLElement } [offsetElement]
   */
  updateFromElement (element, offsetElement) {
    const { left, top, right, bottom, width, height } = getOffsetRect(element, offsetElement)

    return this.update(
      this.leftTop.update(left, top),
      this.rightBottom.update(right, bottom),
      this.size.update(width, height),
    )
  }

  /**
   * @param { Size } size
   * @param { string } alignString
   *
   * @return { Bounds }
   */
  align (size, alignString) {
    return Bounds.toBounds(align(this, size, alignString))
  }

  /**
   * @param { SizeLike | Size } sizeLike
   *
   * @return { Size }
   */
  resize (sizeLike) {
    const size = Size.toSize(sizeLike)

    return size.sub({ width: add(this.left, this.right), height: add(this.top, this.bottom) })
  }

  /**
   * @param { * } bounds
   *
   * @return { boolean }
   */
  isEqual (bounds) {
    return (
      Bounds.isBounds(bounds) &&
      this.leftTop.isEqual(bounds.leftTop) &&
      this.rightBottom.isEqual(bounds.rightBottom) &&
      this.size.isEqual(bounds.size)
    )
  }

  toStyle () {
    const { left, top, right, bottom } = this

    return omitBy({ left, top, right, bottom }, value => value == null)
  }
}

export const isBounds = validator(value => Bounds.isBounds(value), 'Bounds')
