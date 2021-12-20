import { any, bool, func, string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'
import Form from './mixins/Form'

export default {
  ...ElementPropTypes,
  ...Form,

  autoFocus: bool,
  autoComplete: string,
  type: string,
  value: any,

  onChange: func,
  onInput: func,
  onInvalid: func,
  onSubmit: func,
}
