import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Dropdown, Menu } from 'antd'
import css from './styles.less'

export default class NavPanel extends Component {
  static propTypes = {
    className: PropTypes.string,
    authorizedUser: PropTypes.string,
    profileMenu: PropTypes.array,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
    currentRoute: '',
    authorizedUser: '',
    profileMenu: [],
  };

  getProfileMenuItem = (menuItem, index) => (
    <Menu.Item key={index} className={css.profileItem}>
      {menuItem.title}
    </Menu.Item>
  );

  createProfileMenu = menu => (
    <Menu className={css.profile} onClick={this.handleProfileMenuClick}>
      {menu.map((menuItem, index) => {
        if (index + 1 === menu.length) {
          return [
            <Menu.Divider key={index} className={css.profileDivider} />,
            this.getProfileMenuItem(menuItem, index),
          ]
        }

        return this.getProfileMenuItem(menuItem, index)
      })}
    </Menu>
  );

  handleProfileMenuClick = ({ key }) => {
    const { profileMenu } = this.props
    const { action } = profileMenu[key]
    action()
  };

  render () {
    const { className, authorizedUser, profileMenu, children } = this.props
    const rootClass = cn(css.root, className)

    return (
      <div className={css.rootGap}>
        <div className={rootClass}>
          <div className={css.nav}>

            <div className={css.navMenu}>
              {children}
            </div>

            <div className={css.navAdd}>
              {authorizedUser && (
                profileMenu && (
                  <>
                    <Dropdown overlay={this.createProfileMenu(profileMenu)}>
                      <button className={css.navAddAccount}>
                        {authorizedUser.split(' ', 2).map(v => v.charAt(0).toUpperCase())}
                      </button>
                    </Dropdown>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
