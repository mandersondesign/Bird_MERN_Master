import { withRouted } from 'components/Routed'
import { bool, object } from 'prop-types'
import React, { PureComponent } from 'react'
import bem from 'utils/bem'
import { filter } from 'utils/props'

import { Link, LinkDefaultProps, LinkPropTypes } from './Link'
import './Link.scss'

export const NavLinkPropTypes = {
  ...LinkPropTypes,
  activeStyle: object,
  exact: bool,
  strict: bool,
}

export const NavLinkDefaultProps = {
  ...LinkDefaultProps,
  activeStyle: undefined,
  exact: false,
  strict: false,
}

export const NavLink = withRouted(
  class NavLink extends PureComponent {
    static className = 'NavLink';

    static propTypes = {
      ...NavLinkPropTypes,
    };

    static defaultProps = {
      ...NavLinkDefaultProps,
    };

    render () {
      const { active, activeStyle, children, style, ...props } = this.props
      let computedStyle = style

      if (active && activeStyle) {
        computedStyle = { ...style, ...activeStyle }
      }

      return (
        <Link
          {...filter(props, LinkPropTypes)}
          active={active}
          className={bem.block(this, { active })}
          style={computedStyle}
        >
          {children}
        </Link>
      )
    }
  },
)

NavLink.FACE_DANGER = Link.FACE_DANGER
NavLink.FACE_DEFAULT = Link.FACE_DEFAULT
NavLink.FACES = Link.FACES
