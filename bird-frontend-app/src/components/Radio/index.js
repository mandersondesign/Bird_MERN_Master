import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio as AntRadio } from 'antd'
import css from './styles.less'

const RadioGroup = AntRadio.Group

class Radio extends Component {
  renderRadioButtons = ({ label, value, userTypeId }, i) => (
    <AntRadio key={i} value={userTypeId} className={css.radioLabel}>
      {label}
    </AntRadio>
  );

  render () {
    const { label, className, dataSource, inputName, defaultValue, ...props } = this.props

    return (
      <div className={className}>
        <div className={css.label}>
          {label}
        </div>
        <div>
          <RadioGroup name={inputName} {...props} defaultValue={defaultValue}>
            {dataSource.map(this.renderRadioButtons)}
          </RadioGroup>
        </div>
      </div>
    )
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.array,
  label: PropTypes.string,
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  inputName: PropTypes.string,
  onChange: PropTypes.func,
}

Radio.defaultProps = {
  className: '',
  dataSource: [],
  label: '',
  defaultValue: 0,
  value: 0,
  inputName: '',
  onChange: () => {},
}

export default Radio
