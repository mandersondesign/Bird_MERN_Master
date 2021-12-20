import { setProp, validator } from 'utils/props'
import { add, clamp, isNumberLike, sub } from './math'

/**
 * @typedef { Object } PointLike
 * @property { number } left
 * @property { number } top
 */

/**
 * @class
 * @property { ?number } left
 * @property { ?number } top
 */
export class Point {
  static ZERO = new Point(0, 0);

  /**
   * @param { * } value
   *
   * @return { boolean }
   */
  static isPoint (value) {
    return value instanceof this
  }

  /**
   * @param { PointLike | Point } value
   *
   * @return { Point }
   */
  static toPoint (value) {
    let point = value

    if (!this.isPoint(value)) {
      const { left, top } = value == null ? {} : value

      point = new Point(left, top)
    }

    return point
  }

  /**
   * @param { MouseEvent | Touch } event
   *
   * @return { Point }
   */
  static fromEvent (event) {
    return new Point(event.clientX, event.clientY)
  }

  /**
   * @param { HTMLElement } element
   *
   * @return { Point }
   */
  static fromElement (element) {
    return this.toPoint(element.getBoundingClientRect())
  }

  /**
   * @param { ?number } left
   * @param { ?number } top
   */
  constructor (left, top) {
    setProp(this, 'left', left, isNumberLike)
    setProp(this, 'top', top, isNumberLike)
  }

  /**
   * @param { ?number } left
   * @param { ?number } top
   *
   * @return { Point }
   */
  update (left, top) {
    return this.left === left && this.top === top ? this : new Point(left, top)
  }

  /**
   * @param { HTMLElement } element
   */
  updateFromElement (element) {
    const { left, top } = element.getBoundingClientRect()

    return this.update(left, top)
  }

  /**
   * @param { PointLike | Point } pointLike
   *
   * @return { Point }
   */
  add (pointLike) {
    const point = Point.toPoint(pointLike)

    return this.update(add(this.left, point.left), add(this.top, point.top))
  }

  /**
   * @param { PointLike | Point } pointLike
   *
   * @return { Point }
   */
  sub (pointLike) {
    const point = Point.toPoint(pointLike)

    return this.update(sub(this.left, point.left), sub(this.top, point.top))
  }

  /**
   * @param { PointLike | Point } min
   * @param { PointLike | Point } max
   *
   * @return { Point }
   */
  clamp (min, max) {
    const minPoint = Point.toPoint(min)
    const maxPoint = Point.toPoint(max)

    return this.update(clamp(this.left, minPoint.left, maxPoint.left), clamp(this.top, minPoint.top, maxPoint.top))
  }

  /**
   * @param { HTMLElement } element
   *
   * @return { Point }
   */
  relativeTo (element) {
    return this.sub(Point.fromElement(element))
  }

  /**
   * @param { * } point
   *
   * @return { boolean }
   */
  isEqual (point) {
    return Point.isPoint(point) && this.left === point.left && this.top === point.top
  }
}

export const isPoint = validator(value => Point.isPoint(value), 'Point')
