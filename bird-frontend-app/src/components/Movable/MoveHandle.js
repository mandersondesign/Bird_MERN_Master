import { addEventListener } from 'utils/html'
import { Point } from 'utils/rect'

/**
 * @typedef { MouseEvent | Touch } MoveEventData
 */

/**
 * @typedef { Object } MoveHandleProps
 * @property { string } direction - Move direction
 * @property { ?function(MoveHandle, Point) } constraint - Constraint
 * @property { ?function(MoveHandle, Point) } onMove - Move handle
 * @property { ?function(MoveHandle) } onMoveStart - Start move handle
 * @property { ?function(MoveHandle) } onMoveEnd - Stop move handle
 */

/**
 * @typedef { Object } MoveHandleState
 * @property { number } touchId
 * @property { HTMLElement } target - Target to move
 * @property { Point } startPoint - Start point of cursor
 * @property { Point } startPointOffset - Start point of cursor relative to the target element
 */

const NONE = 0
const VERTICAL = 1
const HORIZONTAL = 2
const BOTH = VERTICAL + HORIZONTAL

/**
 * @param { MoveHandle } moveHandle
 * @param { MouseEvent | TouchEvent } event
 *
 * @return { MoveEventData }
 */
function getEventData (moveHandle, event) {
  const { touches } = event
  let data = event

  if (touches) {
    let touchId

    if (moveHandle.state) {
      touchId = moveHandle.state.touchId
    }

    data = touchId == null ? touches[0] : [...touches].find(touch => touch.identifier === touchId)
  }

  return data
}

/**
 * @param { MoveHandle } moveHandle
 * @param { MoveEventData } data
 *
 * @return { Point }
 */
function getPointFromEvent (moveHandle, data) {
  const { direction } = moveHandle.props
  const { startPoint } = moveHandle.state

  const point = { ...startPoint }

  // noinspection JSBitwiseOperatorUsage
  if (direction & HORIZONTAL) {
    point.left = data.clientX
  }

  // noinspection JSBitwiseOperatorUsage
  if (direction & VERTICAL) {
    point.top = data.clientY
  }

  return Point.toPoint(point)
}

/**
 * @param { MoveHandle } moveHandle
 * @param { MouseEvent | TouchEvent } event
 */
function addGlobalListeners (moveHandle, event) {
  const globalListeners = []
  const opts = { passive: false, capture: true }

  if (event.type === 'touchstart') {
    globalListeners.push(
      addEventListener(window, 'touchmove', moveHandle.move, opts),
      addEventListener(window, 'touchup touchend touchcancel', moveHandle.stopMove, opts),
    )
  } else {
    globalListeners.push(
      addEventListener(window, 'mousemove', moveHandle.move, opts),
      addEventListener(window, 'mouseup', moveHandle.stopMove, opts),
    )
  }

  return globalListeners
}

/**
 * @param { * } value
 *
 * @return { boolean }
 */
function isHTMLElement (value) {
  return value instanceof HTMLElement
}

/**
 * @property { MoveHandleProps } props
 * @property { ?MoveHandleState } state
 */
class MoveHandle {
  static NONE = NONE;

  static BOTH = BOTH;

  static HORIZONTAL = HORIZONTAL;

  static VERTICAL = VERTICAL;

  /**
   * @param { Point } point
   * @param { MoveHandle } handle
   *
   * @return { Point }
   */
  static CONSTRAINT_WITHIN = (handle, point) => {
    const {
      target,
      target: { offsetParent },
    } = handle.props

    return point.clamp(Point.ZERO, {
      left: offsetParent.clientWidth - target.offsetWidth,
      top: offsetParent.clientHeight - target.offsetHeight,
    })
  };

  /**
   * @param { number } direction
   *
   * @return { boolean }
   */
  static isHorizontal (direction) {
    return (direction & HORIZONTAL) !== 0
  }

  /**
   * @param { number } direction
   *
   * @return { boolean }
   */
  static isVertical (direction) {
    return (direction & VERTICAL) !== 0
  }

  /**
   * @return { boolean }
   */
  get isMoving () {
    return this.state != null
  }

  /**
   * @return { boolean }
   */
  get isHorizontal () {
    return MoveHandle.isHorizontal(this.props.direction)
  }

  /**
   * @return { boolean }
   */
  get isVertical () {
    return MoveHandle.isVertical(this.props.direction)
  }

  /**
   * @param { MoveHandleProps } props
   */
  constructor (props) {
    this.props = { direction: BOTH, ...props }
    this.state = null
  }

  stopMove = () => {
    if (this.state) {
      const { onMoveEnd } = this.props

      document.documentElement.classList.remove('moving')

      if (onMoveEnd) {
        onMoveEnd(this)
      }

      this.globalListeners.forEach(remover => remover())
      delete this.globalListeners
      delete this.state
    }
  };

  /**
   * @param { MouseEvent | TouchEvent } event
   */
  startMove = event => {
    const data = getEventData(this, event)
    const { target, onMoveStart } = this.props
    const startPoint = Point.fromEvent(data)

    if (this.state) {
      this.stopMove()
    }

    event.preventDefault()
    document.documentElement.classList.add('moving')

    this.state = { touchId: data.identifier, startPoint, startPointOffset: startPoint.relativeTo(target).neg() }
    this.globalListeners = addGlobalListeners(this, event)

    if (onMoveStart) {
      onMoveStart(this)
    }
  };

  /**
   * @param { MouseEvent | TouchEvent } event
   */
  move = event => {
    if (this.state) {
      const data = getEventData(this, event)

      if (data) {
        const currentPoint = getPointFromEvent(this, data)
        const { target, onMove, constraint } = this.props
        const { startPointOffset } = this.state

        let point = currentPoint.relativeTo(target.offsetParent).add(startPointOffset)

        event.preventDefault()

        if (constraint) {
          point = constraint(this, point)
        }

        if (onMove) {
          onMove(this, point)
        }
      } else {
        this.stopMove()
      }
    }
  };

  unlisten () {
    this.stopMove()

    if (this.handleListener) {
      this.handleListener()
      delete this.handleListener
    }

    return this
  }

  /**
   * @param { Partial<MoveHandleProps> } nextProps
   *
   * @return { MoveHandle }
   */
  listen (nextProps) {
    const { props: currProps } = this
    const props = { ...this.props, ...nextProps }

    this.props = props

    if (!isHTMLElement(props.target)) {
      throw new TypeError('MoveHandle#listen(props): `props.target` should be a HTMLElement')
    }

    if (!props.handle) {
      props.handle = props.target
    } else if (!isHTMLElement(props.handle)) {
      throw new TypeError('MoveHandle#listen(props): `props.handle` should be a HTMLElement')
    }

    if (props.handle !== currProps.handle) {
      this.unlisten()
      this.handleListener = addEventListener(props.handle, 'mousedown touchstart', this.startMove, { capture: true })
    }

    return this
  }
}

export default MoveHandle
