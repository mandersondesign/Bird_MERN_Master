import { bool, func, object, oneOfType, string } from 'prop-types'

import { ReactRefType } from 'utils/prop-types/react'
import { ElementPropTypes } from 'utils/prop-types/html'

export default {
  ...ElementPropTypes,
  innerRef: oneOfType([string, func, ReactRefType]),
  replace: bool,
  target: string,
  to: oneOfType([string, object]),
}
