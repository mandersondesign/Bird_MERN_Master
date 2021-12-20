import { bool, element } from 'prop-types'
import { isElement } from 'react-is'
import React, { Children, cloneElement, PureComponent } from 'react'

import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter, prefixBy, prefixed } from 'utils/props'

import './Outlined.scss'

/**
 * @param { Outlined } focusOwner
 *
 * @return { React.ReactElement }
 */
function getElement (focusOwner) {
  const { children } = focusOwner.props

  return Children.only(children)
}

export const OutlinedPropTypes = {
  children: element,
  outline: bool,
  ...prefixBy('outline', ElementPropTypes),
}

export const OutlinedDefaultProps = {
  outline: false,
}

export class Outlined extends PureComponent {
  static propTypes = {
    ...OutlinedPropTypes,
  };

  static defaultProps = {
    ...OutlinedDefaultProps,
  };

  static className = 'Outlined';

  renderOutline () {
    const { outline, ...props } = this.props
    const outlineProps = prefixed(props, 'outline')

    return (
      <div
        {...filter(outlineProps, ElementPropTypes)}
        key='outline'
        className={bem.element(this, 'outline', null, outlineProps.className)}
      />
    )
  }

  renderElement (element) {
    const { props: elementProps } = element
    const { outline } = this.props

    const className = bem.block(this, { outline: Boolean(outline) }, elementProps.className)
    const children = [elementProps.children]

    if (outline) {
      children.push(this.renderOutline())
    }

    return cloneElement(element, { className }, children)
  }

  render () {
    const element = getElement(this)

    return isElement(element) ? this.renderElement(element) : element
  }
}
