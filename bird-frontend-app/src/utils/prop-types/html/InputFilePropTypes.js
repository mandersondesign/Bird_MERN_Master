import { bool, string } from 'prop-types'
import InputPropTypes from './InputPropTypes'
import Required from './mixins/Required'

export default {
  ...InputPropTypes,
  ...Required,

  accept: string,
  capture: bool,
  multiple: bool,
}
