import { setProp, validator } from 'utils/props'
import { add, clamp, div, isNumberLike, max, mul, sub } from './math'

/**
 * @typedef { Object } SizeLike
 * @property { ?number } width
 * @property { ?number } height
 */

/**
 * @class
 * @property { ?number } width
 * @property { ?number } height
 */
export class Size {
  static ZERO = new Size(0, 0);

  /**
   * @param { * } value
   *
   * @return { boolean }
   */
  static isSize (value) {
    return value instanceof this
  }

  /**
   * @param { SizeLike | Size } value
   *
   * @return { Size }
   */
  static toSize (value) {
    let size = value

    if (!this.isSize(value)) {
      const { width, height } = value == null ? {} : value

      size = new Size(width, height)
    }

    return size
  }

  /**
   * @param { HTMLElement } element
   *
   * @return { Size }
   */
  static fromElement (element) {
    return this.toSize(element.getBoundingClientRect())
  }

  /**
   * @return { ?number }
   */
  get center () {
    return div(this.width, 2)
  }

  /**
   * @return { ?number }
   */
  get middle () {
    return div(this.height, 2)
  }

  /**
   * @return { ?number }
   */
  get square () {
    return mul(this.width, this.height)
  }

  /**
   * @param { ?number } width
   * @param { ?number } height
   */
  constructor (width, height) {
    setProp(this, 'width', max(width, 0), isNumberLike)
    setProp(this, 'height', max(height, 0), isNumberLike)
  }

  /**
   * @param { ?number } width
   * @param { ?number } height
   *
   * @return { Size }
   */
  update (width, height) {
    return this.width === width && this.height === height ? this : new Size(width, height)
  }

  /**
   * @param { HTMLElement } element
   */
  updateFromElement (element) {
    const { width, height } = element.getBoundingClientRect()

    return this.update(width, height)
  }

  /**
   * @param { SizeLike | Size } sizeLike
   *
   * @return { Size }
   */
  add (sizeLike) {
    const size = Size.toSize(sizeLike)

    return this.update(add(this.width, size.width), add(this.height, size.height))
  }

  /**
   * @param { SizeLike | Size } sizeLike
   *
   * @return { Size }
   */
  sub (sizeLike) {
    const size = Size.toSize(sizeLike)

    return this.update(sub(this.width, size.width), sub(this.height, size.height))
  }

  /**
   * @param { SizeLike | Size } min
   * @param { SizeLike | Size } max
   *
   * @return { Size }
   */
  clamp (min, max) {
    const minSize = Size.toSize(min)
    const maxSize = Size.toSize(max)

    return this.update(
      clamp(this.width, minSize.width, maxSize.width),
      clamp(this.height, minSize.height, maxSize.height),
    )
  }

  /**
   * @param { * } size
   *
   * @return { boolean }
   */
  isEqual (size) {
    return Size.isSize(size) && this.width === size.width && this.height === size.height
  }
}

export const isSize = validator(value => Size.isSize(value), 'Size')
