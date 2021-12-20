import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { NavLink as NavLinkRouter } from 'react-router-dom'
import './styles.scss'

import cn from 'classnames'

const NavLink = props => {
  const ownProps = {
    className: cn(props.className, 'default-nav-class', {
      border: props.border
    })
  }

  return <NavLinkRouter {..._.omit(props, ['border'])} {...ownProps} />
}

NavLink.propTypes = {
  border: PropTypes.bool,
  className: PropTypes.string,
}

NavLink.defaultProps = {
  border: false,
  className: '',
}

export default NavLink
