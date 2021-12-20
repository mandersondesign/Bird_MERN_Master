import React from 'react'
import { Rate as AntRate } from 'antd'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from '../Icon'

import css from './styles.less'

const roundHalf = num => Math.round(num * 2) / 2

class Rate extends React.Component {
  state = {
    isRated: false,
  }

  onChange = ev => {
    this.props.onChange(ev)
    this.setState({ isRated: true })
  }

  render () {
    const { isRated } = this.props
    const rateClass = (isRated || this.state.isRated) ? 'greenFill' : ''
    const rootClass = cn(
      css.root,
      rateClass,
      this.props.className,
      { [css.rootDisabled]: this.props.disabled },
    )

    return (
      <AntRate
        {...this.props}
        defaultValue={roundHalf(this.props.defaultValue)}
        onChange={this.onChange}
        className={rootClass}
      />
    )
  }
}

Rate.propTypes = {
  defaultValue: PropTypes.number,
  character: PropTypes.element,
  isRated: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

Rate.defaultProps = {
  defaultValue: 0,
  character: <Icon svg type='rateStar' size={25} className='svg' />,
  isRated: false,
  className: '',
  disabled: false,
  onChange: () => {},
}

export default Rate
