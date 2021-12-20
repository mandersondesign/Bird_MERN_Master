import React from 'react'
import PropTypes from 'prop-types'
import css from './styles.less'

const TextList = ({ type, children }) => (
  <div className={css.listStyle}>
    <div className={css[`${type}List`]}>
      {children}
    </div>
  </div>
)

TextList.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

TextList.defaultProps = {
  type: 'dot',
}

export default TextList
