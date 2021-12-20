import { pickBy } from 'lodash'
import aria from './aria'
import data from './data'
import isPrefixed from './isPrefixed'

/**
 * Filters props (by default data-* and aria-* props is allowed).
 *
 * @param { Object } props
 * @param { Object } include
 * @return { Object }
 *
 * @example
 *  import { filter, data } from '.';
 *
 *  filter({ foo: 1, bar: 2 }, { foo: true }); // { foo: 1 }
 *  filter({ foo: 1, bar: 2, 'data-foo': 3 }, { foo: true }); // { foo: 1, 'data-foo': 3 }
 *  filter({ foo: 1, bar: 2, 'data-foo': 3 }, { foo: true, [data]: false }); // { foo: 1 }
 */
function filter (props, include) {
  const allowed = { [data]: true, [aria]: true, ...include }

  return pickBy(
    props,
    (value, key) =>
      include[key] || (allowed[data] && isPrefixed(key, 'data')) || (allowed[aria] && isPrefixed(key, 'aria')),
  )
}

export default filter
