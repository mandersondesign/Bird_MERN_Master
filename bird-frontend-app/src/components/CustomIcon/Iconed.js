import { omit } from 'lodash'
import { element, oneOf } from 'prop-types'
import React, { Children, cloneElement, PureComponent } from 'react'
import { isElement } from 'react-is'
import bem from 'utils/bem'
import { prefixBy, prefixed } from 'utils/props'

import { Icon, IconDefaultProps, IconPropTypes } from './Icon'
import './Iconed.scss'

const ALIGN_LEFT = 'left'
const ALIGN_RIGHT = 'right'
const ALIGN_TOP = 'top'
const ALIGN_BOTTOM = 'bottom'

const ALIGNS = [ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM]

export const IconedPropTypes = {
  children: element,
  icon: oneOf(Icon.TYPES),
  iconAlign: oneOf(ALIGNS),
  ...prefixBy('icon', omit(IconPropTypes, 'type')),
}

export const IconedDefaultProps = {
  icon: null,
  iconAlign: ALIGN_LEFT,
  ...prefixBy('icon', omit(IconDefaultProps, 'type')),
}

export class Iconed extends PureComponent {
  static propTypes = {
    ...IconedPropTypes,
  };

  static defaultProps = {
    ...IconedDefaultProps,
  };

  static className = 'Iconed';

  static ICONS = Icon.TYPES;

  static ALIGN_LEFT = ALIGN_LEFT;

  static ALIGN_RIGHT = ALIGN_RIGHT;

  static ALIGN_TOP = ALIGN_TOP;

  static ALIGN_BOTTOM = ALIGN_BOTTOM;

  static ALIGNS = ALIGNS;

  static FACE_DEFAULT = Icon.FACE_DEFAULT;

  static FACE_ACTIVE = Icon.FACE_ACTIVE;

  static FACE_DANGER = Icon.FACE_DANGER;

  static FACES = Icon.FACES;

  renderIcon () {
    const { icon, iconAlign, ...props } = this.props
    const iconProps = prefixed(props, 'icon')

    return (
      <Icon
        {...iconProps}
        key='icon'
        type={icon}
        className={bem.element(this, 'icon', { [iconAlign]: true }, iconProps.className)}
      />
    )
  }

  renderElement (element) {
    const { props: elementProps } = element
    const { icon, iconAlign } = this.props
    const isIconed = !!icon
    const isAligned = !!iconAlign

    const className = bem.block(this, { icon: isIconed, [iconAlign]: isAligned }, elementProps.className)

    const children = (
      <>
        {this.renderIcon()}
        {elementProps.children}
      </>
    )

    return cloneElement(element, { className }, children)
  }

  render () {
    const { children } = this.props
    const element = Children.only(children)

    return isElement(element) ? this.renderElement(element) : element
  }
}
