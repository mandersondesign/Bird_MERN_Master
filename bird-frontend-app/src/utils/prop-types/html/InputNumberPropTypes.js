import { number } from 'prop-types'
import InputTextPropTypes from './InputTextPropTypes'

export default {
  ...InputTextPropTypes,
  value: number,
  max: number,
  min: number,
  step: number,
}
