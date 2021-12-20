import { string } from 'prop-types'
import React, { PureComponent } from 'react'

import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter } from 'utils/props'

import './AvatarAbbr.scss'

export const AvatarAbbrPropTypes = {
  ...ElementPropTypes,
  userName: string,
}

export const AvatarDefaultProps = {
  userName: '',
}

export class AvatarAbbr extends PureComponent {
  static propTypes = AvatarAbbrPropTypes;

  static defaultProps = AvatarDefaultProps;

  static className = 'AvatarAbbr';

  render () {
    const { userName } = this.props
    const abbr =
      String(userName || '')
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase() || '#'

    return (
      <span {...filter(this.props, ElementPropTypes)} className={bem.block(this, { [abbr.length]: true })}>
        {abbr}
      </span>
    )
  }
}
