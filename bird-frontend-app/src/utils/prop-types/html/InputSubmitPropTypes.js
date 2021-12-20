import { bool, string } from 'prop-types'
import InputButtonPropTypes from './InputButtonPropTypes'

export default {
  ...InputButtonPropTypes,

  formAction: string,
  formEncType: string,
  formMethod: string,
  formNoValidate: bool,
  formTarget: string,
}
