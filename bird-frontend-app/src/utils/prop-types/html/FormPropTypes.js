import { bool, func, string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'

export default {
  ...ElementPropTypes,

  acceptCharset: string,
  action: string,
  autoComplete: string,
  encType: string,
  method: string,
  noValidate: bool,
  target: string,

  onSubmit: func,
  onReset: func,
}
