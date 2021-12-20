import React from 'react'
import Logo from './logoFeet.svg'
import css from './index.less'

const Header = () => {
  return (
    <div className={css.wrapperHeader}>
      <Logo />
    </div>
  )
}

export default Header
