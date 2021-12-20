import React from 'react'
import Hammer from 'react-hammerjs'
import PropTypes from 'prop-types'
import { NavLink } from 'components'
import cn from 'classnames'
import { isMobile } from 'utils'

import Icon from '../Icon'
import css from './styles.less'

const windowWidth = () => window.innerWidth
const PAN_ELEMENT_OFFSET = 160
const TRANSITION_POINT = 768

class MainMenu extends React.Component {
  state = {
    isSubmenuOpen: this.props.menu.map(el => null),
    submenuCoords: this.props.menu.map(el => ({ left: 0, top: 0 })),
    submenuStyles: this.props.menu.map(el => ({ left: 0, top: 0 })),
    panElementStyle: { left: 0 },
  }

  onResize = () => {
    const currentState = { ...this.state }
    currentState.isSubmenuOpen.forEach((el, i) => {
      if (el) {
        const parentElCoords = el.getBoundingClientRect()
        currentState.submenuStyles[i] = {
          left: currentState.submenuCoords[i].left + (parentElCoords.left - currentState.submenuCoords[i].left),
          top: currentState.submenuStyles[i].top,
        }
      }
    })
    this.setState({ submenuStyles: currentState.submenuStyles })
  }

  onScroll = () => {
    const currentSubsStyle = this.state.submenuCoords.map((el, i) => ({
      left: this.state.submenuStyles[i].left,
      top: el.top - window.pageYOffset,
    }))
    this.setState({ submenuStyles: currentSubsStyle })
  }

  onPan = ev => {
    if (isMobile.any() && windowWidth() < TRANSITION_POINT) {
      const panElemenCoords = document.querySelector('.pan-element').getBoundingClientRect()

      let leftOffset = this.state.panElementStyle.left + ev.deltaX / 10
      if (leftOffset > 0) {
        leftOffset = 0
      }
      if (leftOffset < PAN_ELEMENT_OFFSET - panElemenCoords.width) {
        leftOffset = PAN_ELEMENT_OFFSET - panElemenCoords.width
      }

      const newPanElementStyle = { left: leftOffset }
      this.setState({ panElementStyle: newPanElementStyle })
    }
  }

  openSubmenu = (ev, i) => {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('click', this.clickOutside)
    window.addEventListener('touchstart', this.clickOutside)
    const parentElCoords = ev.target.getBoundingClientRect()
    const currentState = { ...this.state }
    currentState.isSubmenuOpen[i] = ev.target
    currentState.submenuCoords[i] = {
      left: parentElCoords.left,
      top: parentElCoords.top + 35,
    }
    this.setState({
      isSubmenuOpen: currentState.isSubmenuOpen,
      submenuCoords: currentState.submenuCoords,
      submenuStyles: currentState.submenuCoords,
    })
  }

  closeSubmenu = (ev, i) => {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('click', this.clickOutside)
    window.removeEventListener('touchstart', this.clickOutside)
    const currentState = { ...this.state }
    currentState.isSubmenuOpen[i] = null
    currentState.submenuCoords[i] = { left: 0, top: 0 }
    this.setState({
      isSubmenuOpen: currentState.isSubmenuOpen,
      submenuCoords: currentState.submenuCoords,
      submenuStyles: currentState.submenuCoords,
    })
  }

  toggleSubmenu = (ev, i) => {
    if (this.state.isSubmenuOpen[i]) {
      this.closeSubmenu(ev, i)
    } else {
      this.openSubmenu(ev, i)
    }
  }

  isOpen = () => this.state.isSubmenuOpen.some(el => !!el);

  clickOutside = ev => {
    if (!ev.target.classList.contains('subs')) {
      const currentState = {}
      currentState.isSubmenuOpen = this.state.isSubmenuOpen.map(el => null)
      currentState.submenuCoords = this.state.submenuCoords.map(el => ({ left: 0, top: 0 }))
      this.setState({
        isSubmenuOpen: currentState.isSubmenuOpen,
        submenuCoords: currentState.submenuCoords,
        submenuStyles: currentState.submenuCoords,
      })
    }
  }

  render () {
    const { className, menu, currentRoute } = this.props
    const rootClass = cn(css.menu, className)

    return (
      <div className={rootClass}>
        <Hammer onPan={this.onPan}>
          <div className={css.menuContent.concat(' pan-element')} style={this.state.panElementStyle}>
            {menu.map((el, i) => {
              if (el.url) {
                const linkCss = cn(css.menuContentItem, {
                  [css.menuLinkActive]: el.url === currentRoute,
                })
                const linkTextCss = cn('', { [css.menuContentItemText]: el.icon })
                return (
                  <NavLink to={el.url} key={i} className={linkCss} activeClassName={css.menuLinkActive}>
                    {el.icon && (
                      <Icon
                        svg
                        type={el.icon}
                        size={16}
                        {...(el.url === currentRoute ? { grad: true } : {})}
                      />
                    )}
                    <span className={linkTextCss}>{el.name}</span>
                  </NavLink>
                )
              }
              return (
                <ul key={i} className={css.menuContentItem.concat(' subs')}>
                  <Hammer onTap={ev => this.toggleSubmenu(ev, i)}>
                    <span role='button' className={css.menuContentSubMenuTitle.concat(' subs')}>
                      {el.name}
                      <Icon svg type='dropdown' size={14} />
                    </span>
                  </Hammer>
                  {this.state.isSubmenuOpen[i] && (
                    <div
                      className={css.menuContentSubMenu.concat(' subs')}
                      style={this.state.submenuStyles[i]}
                    >
                      {el.items.map((e, ind) => {
                        const linkCss = cn('subs', css.menuContentItem, {
                          [css.menuLinkActive]: el.url === currentRoute,
                        })
                        return (
                          <li key={ind} className='subs'>
                            <NavLink to={e.url} className={linkCss} activeClassName={css.menuLinkActive}>
                              {el.icon && (
                                <Icon
                                  svg
                                  type={el.icon}
                                  size={16}
                                  {...(el.url === currentRoute ? { grad: true } : {})}
                                />
                              )}
                              {e.name}
                            </NavLink>
                          </li>
                        )
                      })}
                    </div>
                  )}
                </ul>
              )
            })}
          </div>
        </Hammer>
      </div>
    )
  }
}

MainMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  currentRoute: PropTypes.string,
}

MainMenu.defaultProps = {
  menu: [],
  className: '',
  currentRoute: '',
}

export default MainMenu
