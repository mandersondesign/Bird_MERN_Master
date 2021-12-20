/**
 * Returns component name
 *
 * @param { Class<React.Component | React.PureComponent> } Component
 * @return { string }
 */
const getComponentName = Component => Component.displayName || Component.name || String(Component)

export default getComponentName
