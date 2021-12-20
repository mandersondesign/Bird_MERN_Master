import { Avatar, AvatarDefaultProps, AvatarPropTypes } from 'components/Avatar'
import { Dropdown, DropdownDefaultProps, DropdownPropTypes } from 'components/Dropdown'
import { Link, LinkDefaultProps, LinkPropTypes } from 'components/Link'
import { Sprite } from 'components/Sprite'
import { object } from 'prop-types'
import React, { PureComponent } from 'react'
import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter, prefixBy, prefixed } from 'utils/props'

import './UserMenu.scss'

export const UserMenuPropTypes = {
  ...DropdownPropTypes,
  ...prefixBy('avatar', AvatarPropTypes),
  ...prefixBy('label', ElementPropTypes),
  ...prefixBy('overlay', ElementPropTypes),
  ...prefixBy('settings', LinkPropTypes),
  ...prefixBy('logout', LinkPropTypes),
  user: object,
}

export const UserMenuDefaultProps = {
  ...DropdownDefaultProps,
  ...prefixBy('avatar', AvatarDefaultProps),
  ...prefixBy('settings', LinkDefaultProps),
  ...prefixBy('logout', LinkDefaultProps),
  placement: 'bottomLeft',
  trigger: ['click'],
  user: null,
}

export class UserMenu extends PureComponent {
  static propTypes = UserMenuPropTypes;

  static defaultProps = UserMenuDefaultProps;

  static className = 'UserMenu';

  state = { visible: false };

  handleVisibleChange = visible => {
    this.setState({ visible })
  };

  handleSettingsClick = () => {
    const { onClick } = prefixed(this.props, 'settings')

    this.setState({ visible: false })

    if (onClick) {
      onClick()
    }
  };

  handleLogoutClick = () => {
    const { onClick } = prefixed(this.props, 'logout')

    this.setState({ visible: false })

    if (onClick) {
      onClick()
    }
  };

  renderLabel () {
    const { user, ...props } = this.props
    const { className, ...labelProps } = prefixed(props, 'label')

    return (
      <span {...filter(labelProps, ElementPropTypes)} className={bem.element(this, 'label')}>
        {user.nickname}
      </span>
    )
  }

  renderAvatar () {
    const { user, ...props } = this.props
    const avatarProps = prefixed(props, 'avatar')

    return <Avatar {...filter(avatarProps, AvatarPropTypes)} userName={user.nickname} image={user.picture} />
  }

  renderArrow () {
    const { visible } = this.state

    return <Sprite type='down' className={bem.element(this, 'arrow', { rotate: !visible })} />
  }

  renderSettingsLink () {
    const { className: settingsClassName, ...settingsProps } = prefixed(this.props, 'settings')

    return (
      <Link
        {...filter(settingsProps, LinkPropTypes)}
        icon='settings-stroke'
        icon-className={bem.element(this, 'linkIcon', 'settings')}
        className={bem.element(this, 'link', 'settings', settingsClassName)}
        onClick={this.handleSettingsClick}
      >
        Account Settings
      </Link>
    )
  }

  renderLogoutLink () {
    const { className: logoutClassName, ...logoutProps } = prefixed(this.props, 'logout')

    return (
      <Link
        {...filter(logoutProps, LinkPropTypes)}
        icon='logout'
        icon-className={bem.element(this, 'linkIcon', 'logout')}
        className={bem.element(this, 'link', 'logout', logoutClassName)}
        onClick={this.handleLogoutClick}
      >
        Log Out
      </Link>
    )
  }

  renderOverlay () {
    const { className: overlayClassName, ...overlayProps } = prefixed(this.props, 'overlay')

    return (
      <div {...filter(overlayProps, ElementPropTypes)} className={bem.element(this, 'overlay', null, overlayClassName)}>
        {this.renderSettingsLink()}
        {this.renderLogoutLink()}
      </div>
    )
  }

  render () {
    const { menu, user, ...props } = this.props
    const { visible } = this.state

    if (!user) {
      return null
    }

    return (
      <Dropdown
        {...filter(props, DropdownPropTypes)}
        overlay={this.renderOverlay()}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className={bem.block(this)}>
          <div className={bem.element(this, 'content')}>
            {this.renderAvatar()}
            {this.renderLabel()}
            {this.renderArrow()}
          </div>
        </div>
      </Dropdown>
    )
  }
}
