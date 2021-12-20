import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import Icon from '../../components/Icon'

const Logotype = ({ currentRoute, className, size, color, width, height }) => {
  const isLink = currentRoute.length > 0 && currentRoute !== '/'
  const props = { type: 'logo', size, color, width, height, svg: true }

  return isLink
    ? <NavLink className={className} to='/'><Icon {...props} /></NavLink>
    : <div className={className}><Icon {...props} /></div>
}

Logotype.propTypes = {
  currentRoute: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
}

Logotype.defaultProps = {
  currentRoute: '',
  className: '',
  size: 72,
  color: '#054a91',
}

export default Logotype
