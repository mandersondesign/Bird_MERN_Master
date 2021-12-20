import { omitBy } from 'lodash'
import isPrefixed from './isPrefixed'

/**
 * Returns props without the specified prefixes.
 *
 * @param { Object } props
 * @param { ...string } prefixes
 *
 * @return { Object }
 *
 * @example
 *
 * import { ElementPropTypes } from 'utils/prop-types';
 *
 * const Header = (props) => <header {...props} />;
 * const HeaderPropTypes = { ...ElementPropTypes };
 *
 * Header.propTypes = HeaderPropTypes;
 *
 * const Section = ({ header, ...props }) => (
 *   <section {...unprefixed(props, 'header')}>
 *     <Header {...prefixed(props, 'header')}>{header}</Header>
 *   </section>
 * );
 *
 * const SectionPropTypes = {
 *   ...prefixBy('header', HeaderPropTypes)
 *   // ...
 * };
 *
 * Section.propTypes = SectionPropTypes;
 */
function unprefixed (props, ...prefixes) {
  return omitBy(props, (value, key) => prefixes.some(prefix => isPrefixed(key, prefix)))
}

export default unprefixed
