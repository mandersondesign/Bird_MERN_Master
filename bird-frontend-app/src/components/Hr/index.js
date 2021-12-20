import React from 'react'
import PropTypes from 'prop-types'
import css from './styles.less'

const Hr = props => {
  const style = {
    marginTop: props.margin,
    marginBottom: props.margin,
  }

  return <div className={css.hr} style={style} />
}

Hr.propTypes = {
  margin: PropTypes.number,
}

Hr.defaultProps = {
  margin: 30,
}

export default Hr
