import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'components'
import { logout } from 'modules/session/session-actions'
import { sessionSelector } from 'modules/session/session-selectors'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import { Menu, Dropdown, Tooltip } from 'antd'
import { push } from 'modules/router'
import css from './index.less'
import { DownOutlined, WarningFilled } from '@ant-design/icons'
import c from 'classnames'

const Header = ({ title = '', subTitle = '', additionalHeader = false, admin, session: { user }, ...props }) => {
  const dispatch = useDispatch()
  const userLogout = () => dispatch(logout()).then(() => push('/'))

  const userProfile = id => push(`/coach/${id}`)

  const HeaderProfile = () => {
    const { match: { path, params: { athleteId } } } = props
    const active = path.split('/')[3]
    return (
      <div className={css.wrapperLink}>
        <span>|</span>
        <Link to={`/athletes/${athleteId}/plan`} className={css.item} style={{ color: active === 'plan' ? 'black' : '#C6C6C6' }}>Plan</Link>
        <Link to={`/athletes/${athleteId}/profile`} className={css.item} style={{ color: active === 'profile' ? 'black' : '#C6C6C6' }}>Profile</Link>
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
    user.userTypeId === 1
      ? (
        <div className={css.adminImages}>
          <img alt='Right logo' src='/img/user.svg' className={css.adminAvatar} />
          {admin && <span className={css.adminName}>{user?.name}</span>}
          <img alt='Right logo' src='/img/logout.svg' className={css.adminLogout} onClick={userLogout} />
        </div>
      )
      : (
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
          <div className={css.subTitle}>{subTitle}</div>
          {additionalHeader && HeaderProfile()}
        </div>
        {wrapperUser()}
      </div>
    )
}
const mapStateToProps = state => ({
  session: sessionSelector(state),
  athlets: athletsSelector(state),
})

export default connect(mapStateToProps, null)(Header)
