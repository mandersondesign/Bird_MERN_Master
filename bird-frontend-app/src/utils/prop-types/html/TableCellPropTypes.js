import { number, string } from 'prop-types'
import ElementPropTypes from './ElementPropTypes'

export default {
  ...ElementPropTypes,

  colSpan: number,
  headers: string,
  rowSpan: number,
}
