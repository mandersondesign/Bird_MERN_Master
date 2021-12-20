import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from '../Icon'
import css from './styles.less'

const FONT_SIZE = {
  small: 16,
  default: 22,
  large: 22,
}

export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'flat', 'icon', 'link']),
    htmlType: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    smallBtn: PropTypes.bool,
    btnText: PropTypes.string,
    icon: PropTypes.string,
    iconAntd: PropTypes.bool,
    iconSize: PropTypes.number,
    iconPos: PropTypes.oneOf(['left', 'right']),
    iconStyle: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string,
    disable: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
  };

  static defaultProps = {
    type: 'default',
    htmlType: 'button',
    size: 'default',
    smallBtn: false,
    btnText: '',
    icon: '',
    iconAntd: false,
    iconSize: 24,
    iconPos: 'left',
    iconStyle: {},
    style: { padding: '0 16px' },
    className: '',
    disable: false,
    onClick: () => { },
    onMouseLeave: () => { },
    onFocus: () => { },
    onMouseEnter: () => { },
  };

  state = {};

  handlerClick = e => {
    const { htmlType, onClick } = this.props
    if (htmlType !== 'submit') {
      onClick(e)
    }
  };

  render () {
    const {
      type,
      size,
      smallBtn,
      btnText,
      icon,
      iconAntd,
      iconSize,
      iconPos,
      iconStyle,
      style,
      className,
      disable,
      htmlType,
      onMouseLeave,
      onFocus,
      onMouseEnter,
    } = this.props

    const rootClass = cn(css.button, className, css[`button-size-${size}`], css[`button-${type}`], { [css.smallBtn]: smallBtn })
    const btnStyle = { ...style }
    let btnTextStyle = {}

    if (type === 'icon' || type === 'link') {
      btnStyle.padding = '0'
    }
    if (icon) {
      btnTextStyle = iconPos === 'left' ? { paddingLeft: '6px' } : { paddingRight: '6px' }
    }
    if (type === 'link') {
      btnTextStyle.lineHeight = `${FONT_SIZE[size] || 16}px`
    }

    return (
      <button
        type={htmlType}
        style={btnStyle}
        className={rootClass}
        {...(disable ? { disabled: true } : {})}
        onClick={this.handlerClick}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
      >
        {icon && iconPos === 'left' && (
          <Icon type={icon} size={iconSize} style={iconStyle} {...(!iconAntd ? { svg: true } : {})} />
        )}
        {type !== 'icon' && <span style={btnTextStyle}>{btnText}</span>}
        {icon && iconPos === 'right' && (
          <Icon type={icon} size={iconSize} style={iconStyle} {...(!iconAntd ? { svg: true } : {})} />
        )}
      </button>
    )
  }
}
