import { Dropdown as AntDropdown, Menu as AntMenu } from 'antd'
import { array, arrayOf, func, number, oneOfType, string } from 'prop-types'
import React from 'react'

import { Sprite, SpritePropTypes } from 'components/Sprite'
import bem from 'utils/bem'
import { SpriteType } from 'utils/prop-types'
import { filter, prefixBy, prefixed } from 'utils/props'

import './Dropdown.scss'

export const ItemPropTypes = {
  label: oneOfType([string, number]),
  ...prefixBy('icon', {
    ...SpritePropTypes,
    type: SpriteType,
  }),
}

export const ItemDefaultProps = {
  label: '',
  ...prefixBy('icon', {
    type: null,
  }),
}

const Item = ({ label, ...props }, i) => {
  const { type, ...iconProps } = prefixed(props, 'icon')
  return (
    <AntMenu.Item className={bem.block(Item)} key={i}>
      {type && <Sprite {...filter(iconProps, SpritePropTypes)} type={type} />}
      {label}
    </AntMenu.Item>
  )
}

Item.className = 'Item'
Item.propTypes = ItemPropTypes
Item.defaultProps = ItemDefaultProps

const createMenu = menu => {
  const handleMenuClick = ({ key }) => {
    const { action } = menu[key]
    action()
  }

  return <AntMenu onClick={handleMenuClick}>{menu.map(Item)}</AntMenu>
}

// eslint-disable-next-line react/forbid-foreign-prop-types
const AntdDropdownPropTypes = AntDropdown.propTypes

const AntdDropdownDefaultProps = AntDropdown.defaultProps

export const DropdownPropTypes = {
  ...AntdDropdownPropTypes,
  placement: string,
  trigger: arrayOf(string),
  onVisibleChange: func,
  dataSource: array,
  className: string,
}

export const DropdownDefaultProps = {
  ...AntdDropdownDefaultProps,
  dataSource: [],
  className: null,
}

export const Dropdown = ({ children, dataSource, className, ...props }) => (
  <AntDropdown className={bem.block(Dropdown, null, className)} overlay={createMenu(dataSource)} {...props}>
    {children}
  </AntDropdown>
)

Dropdown.className = 'Dropdown'
Dropdown.propTypes = DropdownPropTypes
Dropdown.defaultProps = DropdownDefaultProps
