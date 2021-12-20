import React, { PureComponent } from 'react'
import {NavLink} from 'react-router-dom'
import { Dropdown, DropdownDefaultProps, DropdownPropTypes } from 'components/Dropdown'
import { LinkDefaultProps, LinkPropTypes } from 'components/Link'
import { Sprite } from 'components/Sprite'
import { array } from 'prop-types'
import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter, prefixBy, prefixed } from 'utils/props'
import './SortingMenu.scss'

export default class PlanMenu extends PureComponent {
  static className = 'SortingMenu';

  state = {
    visible: false,
    updatedText: '',
  };

  handleVisibleChange = visible => {
    this.setState({ visible })
  };

  handleSelect = item => {
    const { onClick } = this.props
    this.setState({
      updatedText: item.name,
      visible: false,
    })
    if (onClick) {
      onClick(item)
    }
  };

  renderLabel () {
    const { items, ...props } = this.props
    const { updatedText } = this.state
    const { className, ...labelProps } = prefixed(props, 'label')

    const defaultText = items.length > 0 ? items[0].name : ''

    return (
      <span {...filter(labelProps, ElementPropTypes)} className={bem.element(this, 'label')}>
        {updatedText}
      </span>
    )
  }

  renderArrow () {
    const { visible } = this.state
    return <Sprite type='down' className={bem.element(this, 'arrow', { rotate: !visible })} />
  }

  renderItem = (item, i) => {
    const { className: logoutClassName } = prefixed(this.props, 'logout')
    return (
      <div
        key={i}
        className={bem.element(this, 'link', 'logout', logoutClassName)}
        onClick={() => this.handleSelect(item)}
      >
        {item.name}
      </div>
    )
  };

  renderOverlay () {
    const { items, showeLink = false } = this.props
    const { className: overlayClassName, ...overlayProps } = prefixed(this.props, 'overlay')
    return (
      <div {...filter(overlayProps, ElementPropTypes)} className={bem.element(this, 'overlay', null, overlayClassName)}>
        {showeLink && (
          <NavLink to='/my_library/plan_templates' className={bem.element(this, 'linkText')}>
            <div className={bem.element(this, 'link', 'logout', '')}>Create New Template</div>
          </NavLink>
        )}
        {items && items.map(this.renderItem)}
      </div>
    )
  }

  render () {
    const { menu, items, ...props } = this.props
    const { visible } = this.state
    return (
      <Dropdown
        {...filter(props, DropdownPropTypes)}
        overlay={this.renderOverlay()}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className={bem.block(this)}>
          <div className={bem.element(this, 'content')}>
            {this.renderLabel()}
            {this.renderArrow()}
          </div>
        </div>
      </Dropdown>
    )
  }
}

PlanMenu.defaultProps = {
  ...DropdownDefaultProps,
  ...prefixBy('logout', LinkDefaultProps),
  placement: 'bottomLeft',
  trigger: ['click'],
  items: [],
}

PlanMenu.propTypes = {
  ...DropdownPropTypes,
  ...prefixBy('label', ElementPropTypes),
  ...prefixBy('overlay', ElementPropTypes),
  ...prefixBy('logout', LinkPropTypes),
  items: array,
}
