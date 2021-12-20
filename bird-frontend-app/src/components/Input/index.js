import React from 'react'
import PropTypes from 'prop-types'
import { Input as AntInput } from 'antd'
import Inputmask from 'inputmask'

// use in mask: 9 - numeric, a - alphabetical, * - alphanumeric
// spaces & other symbols

const maskTypes = {
  // phone: '+9-999-999-9999',
  phone: '+9{1,33}',
  phoneWithoutPlus: '9{1,33}',
  date: '99/99/9999',
  subdivisionCode: '999-999',
}

class Input extends AntInput {
  static propTypes = {
    mask: PropTypes.string,
  };

  static defaultProps = {
    mask: '',
  };

  setRef = el => { this.input = el };

  componentDidMount () {
    const { mask, maskphone, shouldMask = true } = this.props

    if (!shouldMask) return

    const alias = window.location.pathname.split('/')[1]

    const obj = { mask: maskphone || maskTypes[mask] }

    Inputmask(alias === 'event' ? obj : { ...obj, placeholder: '' }).mask(this.input.input)
  }

  render () {
    return <AntInput ref={this.setRef} {...this.props} />
  }
}

export default Input
