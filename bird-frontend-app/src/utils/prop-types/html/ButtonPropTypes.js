import { oneOf } from 'prop-types'
import InputButtonPropTypes from './InputButtonPropTypes'

export default {
  ...InputButtonPropTypes,
  type: oneOf(['button', 'submit', 'reset']),
}
