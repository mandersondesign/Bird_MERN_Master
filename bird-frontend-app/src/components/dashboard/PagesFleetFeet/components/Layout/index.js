import React from 'react'
import { Header, SubHeader } from '../../components'
import css from './index.less'

const Layout = ({ children }) => {
  return (
    <div className={css.wrapperLayout}>
      <Header />
      <div className={css.body}>
        <SubHeader />
        {children}
      </div>
    </div>
  )
}

export default Layout
