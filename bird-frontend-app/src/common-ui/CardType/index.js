import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.less'

const CardType = ({ label, text, position }) =>
  <span className={cn([styles.type, styles[label], styles[position]])}>{text}</span>

CardType.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  position: PropTypes.string,
}

CardType.defaultProps = {
  label: '',
  text: '',
  position: '',
}

export default CardType
