import { string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'

export default {
  ...ElementPropTypes,

  form: string,
  htmlFor: string,
}
