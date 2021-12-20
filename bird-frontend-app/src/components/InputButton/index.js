import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import cn from 'classnames'
import Button from '../Button'

import css from './styles.less'

class InputButton extends React.Component {
  state = {
    text: this.props.defaultValue,
    focusInput: false,
  }

  setFocus = value => {
    if (this.state.text) {
      this.setState({ focusInput: true })
    } else {
      this.setState({ focusInput: value })
    }
  }

  change = ev => {
    this.setState({ text: ev.target.value })
  }

  sendText = () => {
    this.props.onAction(this.state.text)
    this.setState({ text: '' })
  }

  render () {
    const { className, iconPath, label, placeholder, textBtn } = this.props
    const rootClass = cn(css.inputButton, className)
    const labelClass = cn(css.inputButtonLabel, { [css.inputButtonLabelM]: !iconPath })
    const inpWrapClass = cn(css.inputButtonInputWrap, { [css.inputButtonInputWrapM]: !iconPath })
    const inputButtonClass = cn(css.inputButtonBtn, { [css.inputButtonBtnM]: !iconPath })
    const iconStyle = iconPath ? { backgroundImage: `url(${iconPath})` } : {}

    return (
      <div className={rootClass}>
        {label && <div className={labelClass}>{label}</div>}
        <div className={css.inputButtonWrap}>
          <div className={inpWrapClass}>
            {iconPath && <div className={css.inputButtonIcon} style={iconStyle} />}
            <Input.TextArea
              autosize
              onFocus={() => this.setFocus(true)}
              onBlur={() => this.setFocus(false)}
              className={css.inputButtonInput}
              placeholder={placeholder}
              value={this.state.text}
              onChange={this.change}
            />
          </div>
          {this.state.focusInput && (
            <Button
              type='primary'
              className={inputButtonClass}
              disabled={this.state.text.length === 0}
              onClick={this.sendText}
              btnText={textBtn}
            />
          )}
        </div>
      </div>
    )
  }
}

InputButton.propTypes = {
  iconPath: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  textBtn: PropTypes.string,
  className: PropTypes.string,
  onAction: PropTypes.func,
}

InputButton.defaultProps = {
  iconPath: '',
  label: '',
  placeholder: '',
  defaultValue: '',
  textBtn: 'Отправить',
  className: '',
  onAction: () => {},
}

export default InputButton

// onFocus={() => this.setState({ focusInput: true })}
