import { ReactHelper } from '@helioscompanies/bem-classnames'
import { kebabCase } from 'lodash'

export default new ReactHelper({
  formatter: kebabCase,
  blockFormatter: name => `helios-${name}`,
})
