import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.less'

const Header = ({ url, position, parent, overlay }) => (
  <div className={cn(styles[parent], styles[position])}>
    <div className={cn(styles.headerImage, styles[overlay ? 'hover' : ''])} style={{ backgroundImage: `url(${url})` }} />
  </div>
)

Header.propTypes = {
  url: PropTypes.string,
  position: PropTypes.string,
  parent: PropTypes.string,
  overlay: PropTypes.bool,
}

Header.defaultProps = {
  url: null,
  position: '',
  parent: '',
  overlay: false,
}

export default Header
