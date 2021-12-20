import { createElement, forwardRef } from 'react'
import getComponentName from './getComponentName'

const { assign } = Object

function forwardComponent (Component, refProp = 'forwardedRef') {
  const ForwardedComponent = forwardRef((props, ref) => createElement(Component, { ...props, [refProp]: ref }))

  return assign(ForwardedComponent, { displayName: getComponentName(Component) })
}

export default forwardComponent
