import { bool, string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'

export default {
  ...ElementPropTypes,

  download: bool,
  href: string,
  hrefLang: string,
  rel: string,
  target: string,
  type: string,
}
