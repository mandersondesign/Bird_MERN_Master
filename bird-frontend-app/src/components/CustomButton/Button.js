import React, { PureComponent } from 'react'
import { bool, node, oneOf } from 'prop-types'

import { Iconed, IconedPropTypes } from 'components/CustomIcon'
import { Sized, SizedPropTypes } from 'components/Sized'

import bem from 'utils/bem'
import { ButtonPropTypes as ButtonElementPropTypes } from 'utils/prop-types'
import { filter } from 'utils/props'
import cn from 'classnames'
import './Button.scss'

const FACE_DEFAULT = 'default'
const FACE_PRIMARY = 'primary'
const FACE_SECONDARY = 'secondary'
const FACE_DANGER = 'danger'
const FACE_LINK = 'link'
const FACE_PLANS = 'plans'

const FACES = [
  FACE_DEFAULT,
  FACE_PRIMARY,
  FACE_SECONDARY,
  FACE_DANGER,
  FACE_LINK,
  FACE_PLANS,
]
const ICON_ALIGNS = [Iconed.ALIGN_LEFT, Iconed.ALIGN_RIGHT]

export const ButtonPropTypes = {
  ...ButtonElementPropTypes,
  ...IconedPropTypes,
  ...SizedPropTypes,
  children: node,
  face: oneOf(FACES),
  iconAlign: oneOf(ICON_ALIGNS),
  rounded: bool,
}

export const ButtonDefaultProps = {
  face: FACE_DEFAULT,
  size: Sized.SIZE_MEDIUM,
  rounded: false,
}

/**
 * Button component
 * Supports all properties from `button` element
 * Supports icon-pos
 * Supports all props from Sprite prefixed by `icon-`
 */
export class Button extends PureComponent {
  static propTypes = { ...ButtonPropTypes }

  static defaultProps = { ...ButtonDefaultProps }

  static className = 'Button'

  static FACE_DEFAULT = FACE_DEFAULT

  static FACE_PRIMARY = FACE_PRIMARY

  static FACE_SECONDARY = FACE_SECONDARY

  static FACE_DANGER = FACE_DANGER

  static FACE_LINK = FACE_LINK

  static FACE_PLANS = FACE_PLANS

  static FACES = FACES

  static SIZE_SMALL = Sized.SIZE_SMALL

  static SIZE_MEDIUM = Sized.SIZE_MEDIUM

  static SIZE_LARGE = Sized.SIZE_LARGE

  static SIZES = Sized.SIZES

  static ICON_ALIGN_LEFT = Iconed.ALIGN_LEFT

  static ICON_ALIGN_RIGHT = Iconed.ALIGN_RIGHT

  static ICON_ALIGNS = ICON_ALIGNS

  render () {
    const {
      disabled,
      face,
      rounded,
      size,
      buttonContainerStyle,
      ...props
    } = this.props

    return (
      <Sized size={size}>
        <Iconed
          icon-size={size}
          {...filter(props, IconedPropTypes)}
          icon-className={bem.element(
            this,
            'icon',
            null,
            props['icon-className'],
          )}
        >
          <button
            style={{ ...buttonContainerStyle }}
            {...filter(props, ButtonElementPropTypes)}
            disabled={disabled}
            className={cn(
              bem.block(
                this,
                { disabled, rounded, [face]: !!face },
                props.className,
              ),
            )}
          />
        </Iconed>
      </Sized>
    )
  }
}
