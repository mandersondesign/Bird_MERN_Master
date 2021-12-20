import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  isMobile as isMobileWidth,
  isMenu as isMenuShow,
} from 'modules/sidenav/sidenav-actions'
import { slide as Menu } from 'react-burger-menu'
import { MainSideNav } from 'components'
import css from './styles.less'
import Chat from './Chat'

const CoachDashboardContainer = ({ children, ...props }) => {
  const { isMobile, isMenu } = useSelector(({ sidenav }) => sidenav)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isMobileWidth(window.innerWidth < 1000))
    const handleResize = () => dispatch(isMobileWidth(window.innerWidth < 1000))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onClose = () => dispatch(isMenuShow(false))

  return (
    <section className={css.wrapperLayout}>
      {isMobile ? (
        <Menu isOpen={isMenu} onClose={onClose}>
          <MainSideNav />
        </Menu>
      ) : (
        <MainSideNav />
      )}

      <div className={css.contentContainer} id='contentContainer'>
        {children}
      </div>
      <Chat />
    </section>
  )
}

export default CoachDashboardContainer
