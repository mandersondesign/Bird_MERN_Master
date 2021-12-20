import { bool, number } from 'prop-types'
import InputPropTypes from './InputPropTypes'
import Required from './mixins/Required'

export default {
  ...InputPropTypes,
  ...Required,

  multiple: bool,
  size: number,
}
