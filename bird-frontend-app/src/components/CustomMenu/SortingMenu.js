import {
  Dropdown,
  DropdownDefaultProps,
  DropdownPropTypes,
} from 'components/Dropdown'
import { LinkDefaultProps, LinkPropTypes } from 'components/Link'
import { Sprite } from 'components/Sprite'
import { array } from 'prop-types'
import React, { PureComponent } from 'react'
import {
  Divider,
  Menu,
  MenuItem,
  MenuTitle,
  SortingButton,
} from './sorting-menu-styled'
import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter, prefixBy, prefixed } from 'utils/props'

import './SortingMenu.scss'
import { Sort } from '@material-ui/icons'

export const SortingMenuPropTypes = {
  ...DropdownPropTypes,
  ...prefixBy('label', ElementPropTypes),
  ...prefixBy('overlay', ElementPropTypes),
  ...prefixBy('logout', LinkPropTypes),
  items: array,
}

export const SortingMenuDefaultProps = {
  ...DropdownDefaultProps,
  ...prefixBy('logout', LinkDefaultProps),
  placement: 'bottomLeft',
  trigger: ['click'],
  items: [],
}

export class SortingMenu extends PureComponent {
  static propTypes = SortingMenuPropTypes

  static defaultProps = SortingMenuDefaultProps

  static className = 'SortingMenu'

  state = { visible: false, updatedText: '', direction: '' }

  handleVisibleChange = visible => {
    this.setState({ visible })
  }

  handleSorting = item => {
    const { onClick } = this.props
    this.setState({
      updatedText: item.title,
      visible: false,
      direction: item.direction,
    })
    if (onClick) {
      onClick(item)
    }
  }

  renderLabel () {
    const { items, ...props } = this.props
    const { className, ...labelProps } = prefixed(props, 'label')

    const defaultText = 'Sort'

    return <span {...filter(labelProps, ElementPropTypes)}>{defaultText}</span>
  }

  renderArrow () {
    const { visible } = this.state

    return (
      <Sprite
        type='down'
        className={bem.element(this, 'arrow', { rotate: !visible })}
      />
    )
  }

  renderItem = (item, i) => {
    return (
      <MenuItem key={i}>
        <MenuTitle onClick={() => this.handleSorting(item)}>
          {item.title}
        </MenuTitle>
        {i < 5 ? <Divider /> : null}
      </MenuItem>
    )
  }

  renderOverlay () {
    const { items } = this.props
    const { className: overlayClassName, ...overlayProps } = prefixed(
      this.props,
      'overlay',
    )

    return (
      <Menu {...filter(overlayProps, ElementPropTypes)}>
        {items && items.map(this.renderItem)}
      </Menu>
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
        <SortingButton>
          <Sort style={{ marginRight: 6 }} />
          {this.renderLabel()}
        </SortingButton>
      </Dropdown>
    )
  }
}
