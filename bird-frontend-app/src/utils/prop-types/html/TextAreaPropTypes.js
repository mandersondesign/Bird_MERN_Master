import { bool, number } from 'prop-types'
import InputPropTypes from './InputPropTypes'
import Required from './mixins/Required'
import Text from './mixins/Text'

export default {
  ...InputPropTypes,
  ...Required,
  ...Text,

  cols: number,
  rows: number,
  wrap: bool,
}
