import Debug from 'debug'
import { forEach, upperFirst } from 'lodash'
import { func } from 'prop-types'
import React, { PureComponent } from 'react'
import { ReactRefType } from 'utils/prop-types'
import { forwardComponent, getComponentName } from 'utils/react'

const debug = Debug('Controlled')
const { assign, defineProperty, is, keys } = Object

/**
 * Returns name of default value prop
 *
 * @param { string } prop
 * @return { string }
 */
const getDefaultProp = prop => `default${upperFirst(prop)}`

/**
 * Returns name of `onChange` prop
 *
 * @param { string } prop
 * @param { object } def
 * @return { string }
 */
const getOnChangeProp = (prop, def) => (def.onChangeProp ? def.onChangeProp : `on${upperFirst(prop)}Change`)

/**
 * Returns controlled state from props
 *
 * @param { Object } props
 * @param { string } prop
 * @return { boolean }
 */
const isControlledByProps = (props, prop) => props[prop] !== undefined

/**
 * Returns controlled state from state
 *
 * @param { Object } state
 * @param { string } prop
 * @return { boolean }
 */
const isControlledByState = (state, prop) => state.controlledByProps[prop]

/**
 * Checks if property is read-only
 *
 * @param { Object } props
 * @param { string[] } readOnlyProps
 * @return { boolean }
 */
const isReadOnly = (props, readOnlyProps) => readOnlyProps.some(prop => props[prop])

/**
 * Warns if read-only prop was changed
 *
 * @param { Class<React.Component | React.PureComponent> } Component
 * @param { object } props
 * @param { string } prop
 */
const warnReadOnlyChange = (Component, props, prop) => {
  const { controlledProps } = Component
  const { readOnlyProps } = controlledProps[prop]
  const componentName = getComponentName(Component)

  debug(
    `Unexpected changing of ${componentName} prop \`${prop}\` which is specified as read-only ` +
      `by prop \`${readOnlyProps.find(readOnlyProp => props[readOnlyProp])}\`. ` +
      `This is likely a bug in \`${componentName}\`.`,
  )
}

const didWarnControlledChange = new Map()

/**
 * Warns if property was changed from controlled to uncontrolled (or vice versa)
 *
 * @param { Class<React.Component | React.PureComponent> } Component
 * @param { string } prop
 * @param { boolean } controlled
 */
const warnControlledChange = (Component, prop, controlled) => {
  if (!didWarnControlledChange.get(Component)) {
    const componentName = getComponentName(Component)
    const prevState = controlled ? 'uncontrolled' : 'controlled'
    const currState = controlled ? 'controlled' : 'uncontrolled'

    debug(
      `${componentName} ${prevState} prop \`${prop}\` is changing to be ${currState}. ` +
        `${componentName} prop \`${prop}\` should not switch from ${prevState} to ${currState} (or vice versa). ` +
        `Decide between using a controlled or uncontrolled \`${prop}\` for the lifetime of the ${componentName}.`,
    )

    didWarnControlledChange.set(Component, true)
  }
}

/**
 * Creates controlled property type checker
 *
 * @param { function } type
 * @return { function }
 */
const createControlledPropType = type => (props, propName, componentName, ...rest) => {
  let error

  if (type) {
    error = type(props, propName, componentName, ...rest)
  }

  if (!error) {
    const defaultProp = getDefaultProp(propName)

    if (props[propName] !== undefined && props[defaultProp] !== undefined) {
      error = new Error(
        `${componentName} contains both \`${propName}\` and \`${defaultProp}\` props. ` +
          `${componentName} must be either controlled or uncontrolled ` +
          `(specify either the \`${propName}\` prop,  or the \`${defaultProp}\` prop, but not both). ` +
          `Decide between using a controlled or uncontrolled ${componentName} and remove one of these props.`,
      )
    }
  }

  return error
}

/**
 * Controlled property `onChange` checker
 *
 * @param { string } prop
 * @param { string[] } readOnlyProps
 * @return { function }
 */
const createControlledOnChangePropType = (prop, readOnlyProps) => (props, propName, componentName, ...rest) => {
  let error = func(props, propName, componentName, ...rest)

  if (!error) {
    const { [propName]: onChange } = props

    if (readOnlyProps && isReadOnly(props, readOnlyProps)) {
      return null
    }

    if (onChange == null && isControlledByProps(props, prop)) {
      let message =
        `You provided a \`${prop}\` prop to ${componentName} without an \`${propName}\` handler. ` +
        `This means that prop \`${prop}\` is a read-only. ` +
        `If ${componentName} should be mutable use \`${getDefaultProp(prop)}\` instead.`

      if (readOnlyProps) {
        message =
          `${message} Otherwise, set either \`${propName}\` ` +
          `or ${readOnlyProps.map(readOnlyProp => `\`${readOnlyProp}\``).join(' or ')}`
      }

      error = new Error(message)
    }
  }

  return error
}

/**
 * Creates controlled prop types
 *
 * @param { Class<React.Component | React.PureComponent> } Component
 * @return { object }
 */
function createControlledPropTypes (Component) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  const { controlledProps, propTypes: currPropsTypes } = Component
  const propTypes = {}

  forEach(controlledProps, (propDef, prop) => {
    const { readOnlyProps } = propDef
    const type = currPropsTypes ? currPropsTypes[prop] : undefined

    propTypes[prop] = createControlledPropType(type)
    propTypes[getOnChangeProp(prop, propDef)] = createControlledOnChangePropType(prop, readOnlyProps)

    if (type != null) {
      propTypes[getDefaultProp(prop)] = type
    }
  })

  return propTypes
}

/**
 * Creates controlled default props
 *
 * @param { Class<React.Component | React.PureComponent> } Component
 * @return { object }
 */
function createControlledDefaultProps (Component) {
  const { controlledProps } = Component
  const defaultProps = {}

  forEach(controlledProps, (propDef, prop) => {
    defaultProps[prop] = undefined
    defaultProps[getOnChangeProp(prop, propDef)] = undefined
    defaultProps[getDefaultProp(prop)] = undefined
  })

  return defaultProps
}

/**
 * Creates new component with controlled / uncontrolled props
 */
function withControlledProps (Component) {
  if (!Component.controlledProps) {
    throw new TypeError(`${getComponentName(Component)} has no \`controlledProps\``)
  }

  const { controlledProps } = Component

  const controlledPropNames = keys(controlledProps)

  const propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Component.propTypes,
    ...createControlledPropTypes(Component),
  }

  const defaultProps = {
    ...Component.defaultProps,
    ...createControlledDefaultProps(Component),
  }

  class Controlled extends PureComponent {
    static displayName = `Controlled<${getComponentName(Component)}, ${controlledPropNames.join(', ')}>`

    static propTypes = {
      forwardedRef: ReactRefType,
    };

    static defaultProps = {
      forwardedRef: undefined,
    };

    // noinspection JSUnusedGlobalSymbols
    static getDerivedStateFromProps = (props, state) => {
      let controlledState = null

      controlledPropNames.forEach(prop => {
        const controlled = isControlledByProps(props, prop)
        const prevControlled = isControlledByState(state, prop)

        if ((controlled === true && prevControlled === false) || (controlled === false && prevControlled === true)) {
          warnControlledChange(Component, prop, controlled)
        }

        if (controlled !== prevControlled) {
          controlledState = { ...controlledState, [prop]: controlled }
        }
      })

      return controlledState ? { controlledByProps: controlledState } : null
    };

    state = {
      controlledByProps: {},
      uncontrolledValues: {},
    }

    onChangeHandlers = {};

    getDefaultValue (prop) {
      const { props } = this

      return props[getDefaultProp(prop)]
    }

    getControlledValue (prop) {
      const { props } = this

      return props[prop]
    }

    setControlledValue (prop, value) {
      const { [getOnChangeProp(prop, controlledProps[prop])]: onChange } = this.props

      if (typeof onChange === 'function') {
        onChange(value)
      }
    }

    getUncontrolledValue (prop) {
      const { uncontrolledValues } = this.state
      const { [prop]: value } = uncontrolledValues

      return value === undefined ? this.getDefaultValue(prop) : value
    }

    setUncontrolledValue (prop, value) {
      this.setState(({ uncontrolledValues }) => ({ uncontrolledValues: { ...uncontrolledValues, [prop]: value } }))
    }

    getPropValue (prop) {
      return this.isControlled(prop) ? this.getControlledValue(prop) : this.getUncontrolledValue(prop)
    }

    setPropValue (prop, value) {
      if (this.isControlled(prop)) {
        this.setControlledValue(prop, value)
      } else {
        this.setUncontrolledValue(prop, value)
      }
    }

    getPropOnChange (prop) {
      let { [prop]: onChange } = this.onChangeHandlers

      if (!onChange) {
        onChange = this.handlePropChange.bind(this, prop)
        this.onChangeHandlers[prop] = onChange
      }

      return onChange
    }

    static className = 'Controlled'

    isControlled (prop) {
      return isControlledByState(this.state, prop)
    }

    handlePropChange (prop, value) {
      const currValue = this.getPropValue(prop)

      if (!is(value, currValue)) {
        const { readOnlyProps } = controlledProps[prop]

        if (readOnlyProps && isReadOnly(this.props, readOnlyProps)) {
          warnReadOnlyChange(Controlled, this.props, prop)
        }

        this.setPropValue(prop, value)
      }
    }

    render () {
      const { forwardedRef, ...props } = this.props

      controlledPropNames.forEach(prop => {
        props[prop] = this.getPropValue(prop)
        props[getOnChangeProp(prop, controlledProps[prop])] = this.getPropOnChange(prop)
      })

      return <Component {...props} ref={forwardedRef} />
    }
  }

  controlledPropNames.forEach(prop => {
    defineProperty(Component.prototype, prop, {
      enumerable: false,
      configurable: false,
      get () {
        return this.props[prop]
      },
    })
  })

  return [assign(forwardComponent(Controlled), { propTypes, defaultProps }), propTypes, defaultProps]
}

export default withControlledProps
