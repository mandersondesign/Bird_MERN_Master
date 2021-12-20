import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'components'
import { logout } from 'modules/session/session-actions'
import { Menu, Dropdown, Tooltip } from 'antd'
import { push } from 'modules/router'
import css from './index.less'
import { DownOutlined, WarningFilled } from '@ant-design/icons'
import c from 'classnames'

export default ({ title = '', subTitle = '', additionalHeader = false, admin, active, ...props }) => {
  const user = useSelector(({ session }) => session.user)
  const dispatch = useDispatch()
  const userLogout = () => dispatch(logout()).then(() => push('/'))

  const userProfile = id => push(`/coach/${id}`)

  const HeaderProfile = () => {
    return (
      <div className={css.wrapperLink}>
        <span>|</span>
        <Link to={`/coach/${user?.userId}?tab=profile`} className={css.item} style={{ color: active === 'profile' ? 'black' : '#C6C6C6' }}>Profile</Link>
        <Link to={`/coach/${user?.userId}?tab=settings`} className={css.item} style={{ color: active === 'settings' ? 'black' : '#C6C6C6' }}>Settings</Link>
      </div>
    )
  }

  const menu = (
    <Menu>
      <Menu.Item key='0' onClick={() => userProfile(user?.userId)}>My Profile</Menu.Item>
      <Menu.Item key='1' onClick={userLogout}>Logout</Menu.Item>
    </Menu>
  )

  const wrapperUser = () => (
    <Dropdown overlay={menu} trigger={['click']} className={css.userImages} overlayClassName='userImagesOverlay'>
      <div className={css.userImages}>
        {user?.coachPlan?.errorMessage &&
        (
          <Tooltip placement='bottomRight' title={user?.coachPlan?.errorMessage}>
            <WarningFilled style={{ fontSize: '20px', color: '#cf3042', marginRight: '5px' }} />
          </Tooltip>
        )}
        <img alt='Right logo' src={user?.avatar ? `${user.avatar}` : '/img/user.svg'} className={c(css.userAvatar, { [css.userLogo]: !user?.avatar })} />
        {admin && <span className={css.userName}>{user?.name}</span>}
        <DownOutlined style={{ marginLeft: '5px', fontSize: '15px' }} />
      </div>
    </Dropdown>
  )
  return admin
    ? (
      <div className={css.wrapperHeaderAdmin}>
        <div className={css.wrapperLogo}>
          <NavLink to='/users' className={css.button}>
            <img alt='Right logo' src='/img/logo.jpg' className={css.logoImage} />
          </NavLink>
        </div>
        {wrapperUser()}
      </div>
    )
    : (
      <div className={css.wrapperHeader}>
        <div className={css.titles}>
          <div className={css.title}>{title}</div>
          {additionalHeader && HeaderProfile()}
        </div>
        {wrapperUser()}
      </div>
    )
}
