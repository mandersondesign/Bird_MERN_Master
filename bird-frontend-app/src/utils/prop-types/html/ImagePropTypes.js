import { func, string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'
import Image from './mixins/Image'

export default {
  ...ElementPropTypes,
  ...Image,

  alt: string,
  crossOrigin: string,
  sizes: string,
  srcSet: string,

  onLoad: func,
  onError: func,
}
