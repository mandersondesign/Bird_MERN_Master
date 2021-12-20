import React, { forwardRef } from 'react'
import { getComponentName } from 'utils/react'
import { Routed } from './Routed'

const { assign } = Object

function withRouted (Component) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  const { propTypes, defaultProps } = Component

  const RoutedComponent = forwardRef((props, ref) => (
    <Routed>
      <Component {...props} ref={ref} />
    </Routed>
  ))

  return assign(RoutedComponent, { displayName: getComponentName(Component), propTypes, defaultProps })
}

export default withRouted
