import InputPropTypes from './InputPropTypes'
import Checked from './mixins/Checked'
import Required from './mixins/Required'

export default {
  ...InputPropTypes,
  ...Checked,
  ...Required,
}
