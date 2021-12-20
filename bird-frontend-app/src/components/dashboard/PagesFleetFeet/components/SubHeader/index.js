import React from 'react'
import { useLocation } from 'react-router-dom'
import c from 'classnames'
import css from './index.less'

const SubHeader = () => {
  const { pathname } = useLocation()
  const active = pathname?.split('/')[3]

  const menu = [
    {
      title: 'Registration Info',
      path: 'sign-up sign-in',
    },
    {
      title: 'Waiver & Release Form',
      path: 'release-form',
    },
    {
      title: 'Payment',
      path: 'payment',
    },
  ]

  const activeTitle = menu.find(i => i.path.includes(active))

  return (
    <div className={css.wrapperSubHeader}>
      <div className={css.left}>
        {activeTitle?.title}
      </div>

      <div className={css.menu}>
        {menu.map((i, ind) => (
          <div
            key={ind}
            className={c(css.item, {
              [css.activeItem]: i.path.includes(active),
            })}
          >
            <div className={css.circle}>{ind + 1}</div>
            <div className={css.text}>{i.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubHeader
