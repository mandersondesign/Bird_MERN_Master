import { mapKeys } from 'lodash'
import prefixPropBy from './prefixPropBy'

/**
 * Adds the specified prefix to the provided props or prop types.
 *
 * @param { string } prefix
 * @param { Object } props
 *
 * @return { Object }
 *
 * @example
 *
 * import React from 'react';
 * import { ElementPropTypes } from 'utils/prop-types';
 * import { filter, prefixBy, prefixed, unprefixed } from '.';
 *
 * const Header = (props) => <header {...filter(props, ElementPropTypes)} />;
 *
 * // Header supports any of Element props
 * const HeaderPropTypes = { ...ElementPropTypes };
 *
 * Header.propTypes = HeaderPropTypes;
 *
 * const Section = (props) => (
 *  <section {...filter(unprefixed(props, 'header'), ElementPropTypes)}>
 *    <Header {...prefixed(props, 'header')} />
 *  </section>
 * );
 *
 * // Section supports any of Element pros as well as `header` and any of `header-*` props
 * Section.propTypes = {
 *   ...ElementPropTypes,
 *   header: PropTypes.node,
 *   ...prefixBy('header', HeaderPropTypes)
 * };
 */
function prefixBy (prefix, props) {
  return mapKeys(props, (value, key) => prefixPropBy(prefix, key))
}

export default prefixBy
