import React from 'react'
import PropTypes from 'prop-types'

const ContentPreloader = props => {
  const { grade, isLoading, children } = props
  const componentStyle = {
    filter: isLoading ? `blur(${grade * 2 + grade}px)` : '',
  }

  return <div style={componentStyle}>{children}</div>
}

ContentPreloader.propTypes = {
  grade: PropTypes.oneOf([1, 2, 3, 4, 5]),
  isLoading: PropTypes.bool,
}

ContentPreloader.defaultProps = {
  grade: 5,
  isLoading: false,
}

export default ContentPreloader
