import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import { isMenu } from 'modules/sidenav/sidenav-actions'
import { Menu, Dropdown, Tooltip } from 'antd'
import { DownOutlined, WarningFilled, MenuOutlined } from '@ant-design/icons'
import c from 'classnames'
import { logout } from 'modules/session/session-actions'
import css from './index.less'

const { Item } = Menu

const Avatar = () => {
  const { user } = useSelector(({ session }) => session)
  const history = useHistory()
  const dispatch = useDispatch()

  const menu = (
    <Menu>
      <Item key='0' onClick={() => history.push(`/coach/${user?.userId}`)}>My Profile</Item>
      <Item key='1' onClick={() => dispatch(logout()).then(() => history.push('/'))}>Logout</Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} className={css.avatar} overlayClassName='avatarOverlay'>
      <div className={css.wrapper}>
        {user?.coachPlan?.errorMessage && (
          <Tooltip placement='bottomRight' title={user?.coachPlan?.errorMessage}>
            <WarningFilled className={css.iconWarning} />
          </Tooltip>
        )}
        <img src={user?.avatar ? `${user.avatar}` : '/img/user.svg'} className={c(css.userAvatar, { [css.userLogo]: !user?.avatar })} />
        <DownOutlined className={css.iconLogOut} />
      </div>
    </Dropdown>
  )
}

const SubHeaderPlan = () => {
  const { pathname } = useLocation()
  const { athleteId } = useParams()
  const menu = ['plan', 'profile']

  const active = pathname.split('/')[3]

  return (
    <div className={css.subHeaderPlan}>
      <div className={css.line} />
      {menu.map(i => (
        <Link
          key={i}
          to={`/athletes/${athleteId}/${i}`}
          className={c(css.item, { [css.activeItem]: active === i, [css.itemMargin]: i === menu[menu.length - 1] })}
        >
          {i}
        </Link>
      ))}
    </div>
  )
}

const MainHeader = ({ title = '', subTitle = '', additionalHeader }) => {
  const { isMobile } = useSelector(({ sidenav }) => sidenav)
  const dispatch = useDispatch()

  return isMobile ? (
    <header className={c(css.mainHeader, css.mainHeaderMobile)}>
      <div className={css.top}>
        <MenuOutlined className={css.iconMenu} onClick={() => dispatch(isMenu(true))} />
        <Avatar />
      </div>

      <div className={css.bottom}>
        <div className={css.titles}>
          <div className={css.title}>{title}</div>
          <div className={css.subTitle}>{subTitle}</div>
        </div>

        {additionalHeader && <SubHeaderPlan />}
      </div>
    </header>
  ) : (
    <header className={css.mainHeader}>
      <div className={css.left}>
        <MenuOutlined className={css.iconMenu} onClick={() => dispatch(isMenu(true))} />

        {!isMobile && (
          <>
            <div className={css.title}>{title}</div>
            <div className={css.subTitle}>{subTitle}</div>

            {additionalHeader && <SubHeaderPlan />}
          </>
        )}
      </div>

      <Avatar />
    </header>
  )
}

export default MainHeader
// <MenuOutlined />
