import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import css from './styles.less'

const SectionTag = ({ size, content, color }) => {
  const rootClass = cn(css[size], css[color])

  return <div className={rootClass}>{content}</div>
}

SectionTag.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  content: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['grey', 'yellow', 'green', 'blue', 'red']),
}

SectionTag.defaultProps = {
  size: 'small',
  color: 'grey',
}

export default SectionTag
