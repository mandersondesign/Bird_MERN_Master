import { bool, element, oneOf } from 'prop-types'
import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import bem from 'utils/bem'

import './Faced.scss'

const { values } = Object

const FACE = {
  DANGER: 'danger',
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

const FACES = values(FACE)

export const FacedPropTypes = {
  children: element,
  face: oneOf(FACES),
  bordered: bool,
  rounded: bool,
  shadowed: bool,
}

export const FacedDefaultProps = {
  children: undefined,
  face: undefined,
  bordered: false,
  rounded: false,
  shadowed: false,
}

export const Faced = forwardRef(function Faced ({ children, ...props }, ref) {
  const element = Children.only(children)

  if (isValidElement(element)) {
    const { bordered, face, rounded, shadowed } = props

    return cloneElement(element, {
      className: bem.block(Faced, { [face]: !!face, bordered, rounded, shadowed }, element.props.className),
      ref,
    })
  }

  return children
})

Faced.className = 'Faced'
Faced.propTypes = FacedPropTypes
Faced.defaultProps = FacedDefaultProps
Faced.FACE = FACE
