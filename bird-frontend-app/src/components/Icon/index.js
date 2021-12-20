import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Icon as AntdIcon } from 'antd'

import { getIcon, iconsList } from './IconsList'
import css from './styles.less'

const Icon = props => {
  const { svg, type, size, grad, style, onClick, color, width, height, useDashboardWrapper } = props
  let { className } = props

  // style.fontSize = `${size}px`;
  // style.color = color;
  if (!svg) return <AntdIcon onClick={onClick} type={type} style={style} />

  className = cn(css.icon, className)

  const svgWidth = width || size
  const svgHeight = height || size

  return (
    <span className={useDashboardWrapper ? css.wrapperDashboardIcon : css.wrapperIcon} onClick={onClick}>
      {getIcon({ type, className, size, grad, color, width: svgWidth, height: svgHeight })}
    </span>
  )
}

Icon.propTypes = {
  svg: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(iconsList)).isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  grad: PropTypes.bool,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  svg: false,
  size: 36,
  color: '#252C34',
  className: '',
  useDashboardWrapper: false,
  style: {},
  grad: false,
  onClick: () => {},
}

export default memo(Icon)
