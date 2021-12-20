/* eslint-disable react/forbid-foreign-prop-types */
import { zipObject } from 'lodash'
import { createRef } from 'react'

import { ReactRefType } from 'utils/prop-types'
import { getComponentName } from 'utils/react'
import defineCalcProps from './defineCalcProps'

const { defineProperty } = Object

/**
 * Adds props to pass references
 *
 * @param { Class<React.Component | React.PureComponent> } Component
 * @return { Class<React.Component | React.PureComponent> }
 *
 * @example
 * import { $refProps, withRefProps } from 'utils/props';
 *
 * const [Foo, FooPropTypes, FooDefaultProps] = withRefProps(
 *   class Foo extends React.Component {
 *     static refProps = ['foo'];
 *
 *     render() {
 *       return <div ref={this.fooRef}>...</div>;
 *     }
 *   }
 * );
 *
 * class Bar extends React.Component {
 *   fooRef = createRef();
 *
 *   render() {
 *     return <Foo fooRef={this.fooRef} />
 *   }
 * }
 */
function withRefProps (Component) {
  const { refProps } = Component

  if (!refProps) {
    throw new TypeError(`${getComponentName(Component)} has no \`refProps\``)
  }

  refProps.forEach(prop => {
    const refProp = `${prop}Ref`

    defineProperty(Component.prototype, prop, {
      enumerable: false,
      configurable: false,
      get () {
        return this[refProp].current
      },
    })
  })

  return defineCalcProps(
    Component,
    zipObject(refProps.map(prop => `${prop}Ref`), refProps.map(() => [ReactRefType, current => current || createRef()])),
  )
}

export default withRefProps
