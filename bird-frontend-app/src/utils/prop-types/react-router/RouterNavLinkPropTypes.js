import { bool, func, object, oneOf, string } from 'prop-types'
import RouterLinkPropTypes from './RouterLinkPropTypes'

export default {
  ...RouterLinkPropTypes,
  'aria-current': oneOf(['page', 'step', 'location', 'date', 'time', 'true']),
  activeClassName: string,
  activeStyle: object,
  exact: bool,
  isActive: func,
  location: object,
  strict: bool,
}
