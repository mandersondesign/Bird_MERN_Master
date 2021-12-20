// @flow
import React from 'react'
import { Progress as ProgressComp } from 'antd'
import { omit } from 'lodash'
import css from './styles.less'

type PropTypes = {
  indicatorBlock: boolean,
}

class Progress extends React.Component<PropTypes> {
  state = {}

  render () {
    const { indicatorBlock = false, percent } = this.props
    const newProps = omit(this.props, 'indicatorBlock')

    const className = indicatorBlock
      ? percent === 100 ? css['progress-line-for-complete-block'] : css['progress-line-for-block']
      : null

    return <ProgressComp {...newProps} className={className} />
  }
}

export default Progress
