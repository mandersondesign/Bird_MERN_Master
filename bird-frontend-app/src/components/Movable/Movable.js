import { element, func, instanceOf, shape } from 'prop-types'
import { cloneElement, createRef, PureComponent } from 'react'
import { findDOMNode } from 'react-dom'

import bem from 'utils/bem'
import { translate3d } from 'utils/html'

import MoveHandle from './MoveHandle'
import './Movable.scss'

const { assign } = Object

const HTMLRefType = shape({
  current: instanceOf(HTMLElement),
})

/**
 * @param { MoveHandle } moveHandle
 * @param { Bounds } point
 */
const defaultOnMove = (moveHandle, point) => {
  const { target } = moveHandle.props

  assign(target.style, translate3d(point))
}

export const MovablePropTypes = {
  children: element.isRequired,
  handle: instanceOf(MoveHandle).isRequired,
  handleRef: HTMLRefType,
  onMove: func,
  onMoveStart: func,
  onMoveEnd: func,
}

export const MovableDefaultProps = {
  handleRef: null,
  onMove: defaultOnMove,
  onMoveStart: null,
  onMoveEnd: null,
}

export class Movable extends PureComponent {
  static className = 'Movable';

  static propTypes = MovablePropTypes;

  static defaultProps = MovableDefaultProps;

  state = { moving: false };

  componentDidMount () {
    this.listen(this.props)
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate (prevProps) {
    const { handle, handleRef } = this.props

    if (handle !== prevProps.handle || handleRef !== prevProps.handleRef) {
      this.unlisten(prevProps)
      this.listen(this.props)
    }
  }

  componentWillUnmount () {
    if (this.moveHandle) {
      this.moveHandle.unlisten()
    }
  }

  targetRef = createRef();

  listen = props => {
    const { targetRef } = this
    const { handle, handleRef } = props

    const moveHandleProps = {
      // eslint-disable-next-line react/no-find-dom-node
      target: findDOMNode(targetRef.current),
      // eslint-disable-next-line react/no-find-dom-node
      handle: handleRef ? findDOMNode(handleRef.current) : undefined,
      onMove: this.handleMove,
      onMoveStart: this.handleMoveStart,
      onMoveEnd: this.handleMoveEnd,
    }

    handle.listen(moveHandleProps)
  };

  unlisten = props => {
    const { handle } = props

    handle.unlisten()
  };

  handleMove = (handle, point) => {
    const { onMove } = this.props

    if (typeof onMove === 'function') {
      onMove(handle, point)
    }
  };

  handleMoveStart = handle => {
    const { onMoveStart } = this.props

    this.setState({ moving: true })

    if (typeof onMoveStart === 'function') {
      onMoveStart(handle)
    }
  };

  handleMoveEnd = handle => {
    const { onMoveEnd } = this.props

    this.setState({ moving: false })

    if (typeof onMoveEnd === 'function') {
      onMoveEnd(handle)
    }
  };

  render () {
    const { children: child } = this.props
    const { moving } = this.state
    const { className } = child.props

    // noinspection JSUnresolvedFunction
    return cloneElement(child, {
      ref: this.targetRef,
      className: bem.block(this, { moving }, className),
    })
  }
}
