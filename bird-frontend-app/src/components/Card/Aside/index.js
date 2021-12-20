import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.less'

const Aside = ({ url, title }) => (
  <div className={styles.aside}>
    <img src={url} alt={title} />
  </div>
)

Aside.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
}

Aside.defaultProps = {
  url: '',
  title: '',
}

export default Aside
