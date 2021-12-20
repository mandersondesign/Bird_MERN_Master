import { bool } from 'prop-types'
import React, { PureComponent } from 'react'
import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter, withRefProps } from 'utils/props'

import './Focus.scss'

// eslint-disable-next-line import/prefer-default-export
export const [Focus, FocusPropTypes, FocusDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } selfRef
   */
  class Focus extends PureComponent {
    static propTypes = {
      ...ElementPropTypes,
      disabled: bool,
    };

    static defaultProps = {
      disabled: false,
    };

    static className = 'Focus';

    static refProps = ['self'];

    blur () {
      const { current } = this.selfRef

      if (current) {
        current.blur()
      }
    }

    focus () {
      const { current } = this.selfRef

      if (current) {
        current.focus()
      }
    }

    render () {
      const { disabled, ...props } = this.props

      return (
        <button
          {...filter(props, ElementPropTypes)}
          ref={this.selfRef}
          disabled={disabled}
          className={bem.block(this)}
        />
      )
    }
  },
)
