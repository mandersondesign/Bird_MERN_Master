import { oneOf, string } from 'prop-types'
import React, { PureComponent } from 'react'

import bem from 'utils/bem'
import { filter } from 'utils/props'
import { ElementPropTypes } from 'utils/prop-types'
import sprites from '../../sprites'

import './Sprite.scss'

const TYPES = Object.keys(sprites)

export const SpritePropTypes = {
  ...ElementPropTypes,
  type: oneOf(TYPES),
  primaryColor: string,
  secondaryColor: string,
}

export const SpriteDefaultProps = {
  primaryColor: null,
  secondaryColor: null,
}

export class Sprite extends PureComponent {
  static propTypes = { ...SpritePropTypes };

  static defaultProps = { ...SpriteDefaultProps };

  static className = 'Sprite';

  static TYPES = TYPES;

  render () {
    const { type } = this.props
    const { [type]: sprite } = sprites

    if (sprite) {
      const { primaryColor, secondaryColor, ...props } = this.props
      let computedStyle = props.style

      if (primaryColor) {
        computedStyle = { ...computedStyle, fill: primaryColor }
      }

      if (secondaryColor) {
        computedStyle = { ...computedStyle, color: secondaryColor }
      }

      return (
        <svg
          {...filter(props, ElementPropTypes)}
          viewBox={sprite.viewBox}
          className={bem.block(Sprite, [type], props.className)}
          style={computedStyle}
        >
          <use xlinkHref={sprite.url} />
        </svg>
      )
    }

    return null
  }
}
