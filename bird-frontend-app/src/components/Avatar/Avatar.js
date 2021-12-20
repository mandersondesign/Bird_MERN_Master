import { string } from 'prop-types'
import React, { PureComponent } from 'react'

import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter } from 'utils/props'

import { AvatarAbbr } from './AvatarAbbr'
import './Avatar.scss'

export const AvatarPropTypes = {
  ...ElementPropTypes,
  userName: string,
  image: string,
}

export const AvatarDefaultProps = {
  userName: '',
  image: null,
}

export class Avatar extends PureComponent {
  static propTypes = AvatarPropTypes;

  static defaultProps = AvatarDefaultProps;

  static className = 'Avatar';

  renderImage () {
    const { image, userName } = this.props

    return <img src={image} alt={userName} className={bem.element(this, 'image')} align='middle' />
  }

  renderAbbr () {
    const { userName } = this.props

    return <AvatarAbbr userName={userName} className={bem.element(this, 'abbr')} />
  }

  render () {
    const { image, userName, ...props } = this.props

    return (
      <div {...filter(props, ElementPropTypes)} className={bem.block(this, { image: !!image })}>
        {image ? this.renderImage() : this.renderAbbr()}
      </div>
    )
  }
}
