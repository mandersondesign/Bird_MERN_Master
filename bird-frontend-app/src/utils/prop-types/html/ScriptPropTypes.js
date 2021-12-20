import { bool, string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'

export default {
  ...ElementPropTypes,

  async: bool,
  crossOrigin: string,
  defer: bool,
  integrity: string,
  src: string,
  type: string,
}
