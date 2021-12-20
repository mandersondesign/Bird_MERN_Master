import React, { memo } from 'react'
import { Icon } from 'antd'
import css from './index.less'

const icons = [
  <div key='0' className={css.iconNoRes} />,
  <Icon key='1' type='check-circle' theme='filled' className={css.iconDone} />,
  <Icon key='2' type='stop' className={css.iconStop} />,
  <Icon key='3' type='check-circle' className={css.iconBlackRes} />,
]

const IconType = ({ status }) => icons[status - 1]

export default memo(IconType)
