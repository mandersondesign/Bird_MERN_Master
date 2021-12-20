import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.less'

function getSeparator (delimiter) {
  if (typeof delimiter === 'string') {
    return delimiter === '' || delimiter === String.fromCharCode(160)
      ? delimiter
      : `${String.fromCharCode(160)}${delimiter}${String.fromCharCode(160)}`
  }
  return `${String.fromCharCode(160)}${String.fromCharCode(delimiter)}${String.fromCharCode(160)}`
}

const MetaText = props => {
  const { text, delimiter, className, component } = props
  const separator = getSeparator(delimiter)
  const content = text.join(separator)
  const rootClass = cn(styles.metaText, className)

  return (
    <div className={rootClass}>
      {content}
      {component && separator}
      {component}
    </div>
  )
}

MetaText.propTypes = {
  component: PropTypes.object,
  text: PropTypes.arrayOf(PropTypes.string),
  delimiter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

MetaText.defaultProps = {
  component: null,
  text: [],
  delimiter: String.fromCharCode(160),
  className: '',
}

export default MetaText
