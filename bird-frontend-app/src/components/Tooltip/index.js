import React, { memo } from 'react'
import { Tooltip as TooltipAntd } from 'antd'
import css from './styles.less'

const align = {
  points: ['bc', 'tc'],
  offset: [0, 0],
}

const Tooltip = props => {
  const { content, width } = props
  return (
    <TooltipAntd {...props} align={align} overlayStyle={width ? { width } : {}} overlayClassName={css.tooltip}>
      <span>{content}</span>
    </TooltipAntd>
  )
}

export default memo(Tooltip)
