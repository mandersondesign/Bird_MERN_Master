import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.less'

const Header = ({ url, card, alt }) => (
  <div className={cn(styles.header, styles[card])}>
    <img src={url} alt={alt} />
  </div>
)

Header.propTypes = {
  url: PropTypes.string,
  card: PropTypes.string,
  alt: PropTypes.string,
}

Header.defaultProps = {
  url: null,
  card: null,
  alt: null,
}

export default Header
