import { omitBy } from 'lodash'
import { setProp, validator } from 'utils/props'
import { isPoint, Point } from './Point'
import { isSize, Size } from './Size'

/**
 * @typedef { Object } RectLike
 * @property { ?number } left
 * @property { ?number } top
 * @property { ?number } width
 * @property { ?number } height
 */

/**
 * @property { Point } leftTop
 * @property { Size } size
 */
export class Rect {
  /**
   * @param { * } value
   *
   * @return { boolean }
   */
  static isRect (value) {
    return value instanceof this
  }

  /**
   * @param { RectLike | Rect } value
   *
   * @return { Rect }
   */
  static toRect (value) {
    let rect = value

    if (!this.isRect(value)) {
      const { left, top, width, height } = value == null ? {} : value

      rect = new Rect(new Point(left, top), new Size(width, height))
    }

    return rect
  }

  /**
   * @param { HTMLElement } element
   *
   * @return { Rect }
   */
  static fromElement (element) {
    return this.toRect(element.getBoundingClientRect())
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
  get width () {
    return this.size.width
  }

  /**
   * @return { ?number }
   */
  get height () {
    return this.size.height
  }

  /**
   * @return { ?number }
   */
  get square () {
    return this.size.square
  }

  /**
   * @param { Point } leftTop
   * @param { Size } size
   */
  constructor (leftTop, size) {
    setProp(this, 'leftTop', leftTop, isPoint)
    setProp(this, 'size', size, isSize)
  }

  /**
   * @param { Point } leftTop
   * @param { Size } size
   *
   * @return { Rect }
   */
  update (leftTop, size) {
    return this.leftTop === leftTop && this.size === size ? this : new Rect(leftTop, size)
  }

  /**
   * @param { HTMLElement } element
   */
  updateFromElement (element) {
    const { left, top, width, height } = element.getBoundingClientRect()

    return this.update(this.leftTop.update(left, top), this.size.update(width, height))
  }

  /**
   * @param { * } rect
   *
   * @return { boolean }
   */
  isEqual (rect) {
    return Rect.isRect(rect) && this.leftTop.isEqual(rect.leftTop) && this.size.isEqual(rect.size)
  }

  toStyle () {
    const { left, top, width, height } = this

    return omitBy({ left, top, width, height }, value => value == null)
  }
}

export const isRect = validator(value => Rect.isRect(value), 'Rect')
