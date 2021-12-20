import { arrayOf, bool, func, node, object, oneOfType, string } from 'prop-types'

import { ReactElementType } from 'utils/prop-types/react'

export default {
  children: oneOfType([func, node]),
  component: ReactElementType,
  exact: bool,
  location: object,
  path: oneOfType([string, arrayOf(string)]),
  render: func,
  sensitive: bool,
  strict: bool,
}
