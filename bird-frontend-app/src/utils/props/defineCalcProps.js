/* eslint-disable react/forbid-foreign-prop-types */
import { forEach, mapValues } from 'lodash'
import { checkPropTypes } from 'prop-types'
import { getComponentName } from 'utils/react'

const { assign, defineProperty } = Object

function defineCalcProps (Component, calcProps) {
  const { prototype } = Component
  const displayName = getComponentName(Component)

  const propTypes = {
    ...Component.propTypes,
    ...mapValues(calcProps, ([PropType]) => PropType),
  }

  forEach(calcProps, ([PropType, creator], prop) => {
    const $prop = Symbol(`${displayName}.${prop}`)

    defineProperty(prototype, prop, {
      enumerable: false,
      configurable: false,
      get () {
        let { [prop]: value } = this.props

        if (value == null) {
          value = creator(this[$prop], this.props)

          checkPropTypes({ [prop]: PropType }, { [prop]: value }, prop, displayName)
          defineProperty(this, $prop, { value, configurable: true })
        }

        return value
      },
    })
  })

  return [assign(Component, { propTypes }), propTypes, Component.defaultProps]
}

export default defineCalcProps
