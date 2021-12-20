import { bool, oneOf } from 'prop-types'
import React, { PureComponent } from 'react'

import { Sized, SizedDefaultProps, SizedPropTypes } from 'components/Sized'
import { Sprite, SpriteDefaultProps, SpritePropTypes } from 'components/Sprite'
import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter, prefixBy, prefixed } from 'utils/props'

import './Icon.scss'

const FACE_DEFAULT = 'default'
const FACE_ACTIVE = 'active'
const FACE_DANGER = 'danger'

const FACES = [FACE_DEFAULT, FACE_ACTIVE, FACE_DANGER]

export const IconPropTypes = {
  ...ElementPropTypes,
  ...SizedPropTypes,
  ...prefixBy('sprite', SpritePropTypes),
  bordered: bool,
  face: oneOf(FACES),
  light: bool,
  rounded: bool,
}

export const IconDefaultProps = {
  ...SizedDefaultProps,
  ...prefixBy('sprite', SpriteDefaultProps),
  bordered: false,
  face: undefined,
  light: false,
  rounded: false,
}

export class Icon extends PureComponent {
  static className = 'Icon';

  static propTypes = {
    ...IconPropTypes,
  };

  static defaultProps = {
    ...IconDefaultProps,
  };

  static FACE_DEFAULT = FACE_DEFAULT;

  static FACE_ACTIVE = FACE_ACTIVE;

  static FACE_DANGER = FACE_DANGER;

  static FACES = FACES;

  static TYPES = Sprite.TYPES;

  static SIZE_SMALL = Sized.SIZE_SMALL;

  static SIZE_MEDIUM = Sized.SIZE_MEDIUM;

  static SIZE_LARGE = Sized.SIZE_LARGE;

  static SIZES = Sized.SIZES;

  renderSprite () {
    const { bordered, face, light, rounded, type, ...props } = this.props
    const spriteProps = prefixed(props, 'sprite')

    return (
      <Sprite
        {...filter(spriteProps, SpritePropTypes)}
        type={type}
        className={bem.element(this, 'sprite', { [face]: !!face, bordered, light, rounded }, spriteProps.className)}
      />
    )
  }

  render () {
    const { bordered, face, light, rounded, size, type, ...props } = this.props

    if (!type) {
      return null
    }

    return (
      <Sized size={size}>
        <i
          {...filter(props, ElementPropTypes)}
          className={bem.block(this, { [face]: !!face, bordered, light, rounded })}
        >
          {this.renderSprite()}
        </i>
      </Sized>
    )
  }
}
