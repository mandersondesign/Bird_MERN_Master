import { getComponentName } from 'utils/react'
import defineCalcProps from './defineCalcProps'

/**
 * Creates reference prop
 *
 * @param { Class<React.Component> } Component
 *
 * @return { Class<React.Component> }
 *
 * @example
 *  import { instanceOf } from 'prop-types';
 *  import React from 'react';
 *
 *  const Foo = withCalc(
 *    class Foo extends React.Component {
 *      static calcProps = {
 *        bar: [ instanceOf(SomeClass), current => current || new SomeClass() ]
 *      }
 *    }
 *
 *    render() {
 *      const { bar } = this;
 *
 *      // bar is this.props.bar or created instance of SomeClass
 *    }
 * );
 *
 */
function withCalcProps (Component) {
  const { calcProps } = Component

  if (!calcProps) {
    throw new TypeError(`${getComponentName(Component)} has no \`calcProps\``)
  }

  return defineCalcProps(Component, calcProps)
}

export default withCalcProps
