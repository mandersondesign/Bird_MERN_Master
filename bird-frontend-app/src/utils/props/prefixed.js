import { mapKeys, pickBy } from 'lodash'
import isPrefixed from './isPrefixed'

/**
 * Returns props with the specified prefix.
 *
 * @param { Object } props
 * @param { string } prefix
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
 *   <section>
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
 *
 *
 * render(<Section header='test' header-onClick={() => alert('clicked')} />);
 */
function prefixed (props, prefix) {
  const { length } = prefix

  return mapKeys(pickBy(props, (val, key) => isPrefixed(key, prefix)), (val, key) => key.substring(length + 1))
}

export default prefixed
