import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.less'
import Icon from '../../Icon'

const Rate = ({ rate }) => (
  <span>
    <Icon svg type='star' size={13} className={styles.iconRate} />
    {rate}
  </span>
)

Rate.propTypes = {
  rate: PropTypes.string,
}

Rate.defaultProps = {
  rate: '',
}

export default Rate
