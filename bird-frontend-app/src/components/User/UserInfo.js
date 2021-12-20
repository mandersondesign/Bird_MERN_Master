import React, { PureComponent } from 'react'
import { object, string } from 'prop-types'
import { Avatar, AvatarDefaultProps, AvatarPropTypes } from 'components/Avatar'

import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'

import './UserInfo.scss'
import { filter, prefixBy, prefixed } from '../../utils/props'

export const UserInfoPropTypes = {
  ...ElementPropTypes,
  ...prefixBy('avatar', AvatarPropTypes),
  user: object,
  badge: string,
  event: string,
}

export const UserInfoDefaultProps = {
  ...prefixBy('avatar', AvatarDefaultProps),
  user: null,
  badge: null,
  event: null,
}

export class UserInfo extends PureComponent {
  static propTypes = { ...UserInfoPropTypes };

  static defaultProps = { ...UserInfoDefaultProps };

  static className = 'UserInfo';

  renderAvatar () {
    const { user, ...props } = this.props
    const avatarProps = prefixed(props, 'avatar')

    return <Avatar {...filter(avatarProps, AvatarPropTypes)} userName={user.nickname} image={user.avatar} />
  }

  render () {
    const { user, badge, event } = this.props

    return (
      <div className={bem.block(this)}>
        {this.renderAvatar()}

        {user?.nickname && (
          <div className={bem.element(this, 'wrapper')}>
            {event && <span className={bem.element(this, 'eventName')}>{event}</span>}
            <span className={bem.element(this, 'name')}>{user.nickname}</span>
          </div>
        )}
        {badge && <div className={bem.element(this, 'label')}>{badge}</div>}
      </div>
    )
  }
}
