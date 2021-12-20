import { bool, func } from 'prop-types'
import { isElement } from 'react-is'
import React, { Children, cloneElement, PureComponent } from 'react'

import { Outlined, OutlinedDefaultProps, OutlinedPropTypes } from 'components/Outlined'
import bem from 'utils/bem'
import { filter, withControlledProps, withRefProps } from 'utils/props'

import { Focus, FocusPropTypes } from './Focus'
import './Focusable.scss'

export const [ControlledFocusable, ControlledFocusablePropTypes, ControlledFocusableDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } focusRef
   */
  class Focusable extends PureComponent {
    static propTypes = {
      ...OutlinedPropTypes,
      disabled: bool,
      focused: bool,
      onFocusedChange: func.isRequired,
    };

    static defaultProps = {
      ...OutlinedDefaultProps,
      disabled: false,
      focused: false,
    };

    static refProps = ['anchor'];

    static controlledProps = {
      focused: { onChangeProp: 'onFocusedChange', readOnlyProps: ['disabled'] },
    };

    static className = 'Focusable';

    handleBlur = () => {
      this.handleFocusedChange(false)
    };

    handleFocus = () => {
      this.handleFocusedChange(true)
    };

    handleMouseDown = event => {
      const { disabled, children } = this.props
      const { onMouseDown } = Children.only(children).props

      event.preventDefault()

      if (!disabled) {
        this.focus()
      }

      if (typeof onMouseDown === 'function') {
        onMouseDown(event)
      }
    };

    handleFocusedChange (focused) {
      const { focused: currFocused, onFocusedChange } = this.props

      if (focused !== currFocused) {
        onFocusedChange(focused)
      }
    }

    blur () {
      if (this.anchor) {
        this.anchor.blur()
      }
    }

    focus () {
      if (this.anchor) {
        this.anchor.focus()
      }
    }

    renderFocus () {
      const { children, focused, ...props } = this.props

      return (
        <Focus
          {...filter(props, FocusPropTypes)}
          ref={this.anchorRef}
          key='anchor'
          className={bem.element(this, 'focus', null, props.className)}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
      )
    }

    renderElement (element) {
      const { props: elementProps } = element
      const { disabled, focused, outline } = this.props

      const className = bem.block(this, { disabled: !!disabled, focused: !!focused }, elementProps.className)
      const children = [elementProps.children]

      return (
        <Outlined outline={outline && focused}>
          {cloneElement(element, { className, onMouseDown: this.handleMouseDown }, [this.renderFocus(), children])}
        </Outlined>
      )
    }

    render () {
      const { children } = this.props
      const element = Children.only(children)

      return isElement(element) ? this.renderElement(element) : element
    }
  },
)

export const [Focusable, FocusablePropTypes, FocusableDefaultProps] = withControlledProps(ControlledFocusable)
