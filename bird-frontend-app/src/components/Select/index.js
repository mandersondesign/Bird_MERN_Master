import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select as AntSelect } from 'antd'
import css from './styles.less'

class Select extends Component {
  renderOptions = ({ label, value }, i) => (
    <AntSelect.Option key={i} value={value || label}>
      {label}
    </AntSelect.Option>
  );

  render () {
    const { label, className, dataSource, ...props } = this.props

    return (
      <div className={className}>
        <div className={css.label}>
          {label}
        </div>
        <AntSelect
          {...props}
          className={css.select}
        >
          {dataSource.map(this.renderOptions)}
        </AntSelect>
      </div>
    )
  }
}

Select.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.array,
  value: PropTypes.string || PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
}

Select.defaultProps = {
  className: '',
  dataSource: [],
  value: undefined,
  label: '',
  onChange: () => {},
}

export default Select
