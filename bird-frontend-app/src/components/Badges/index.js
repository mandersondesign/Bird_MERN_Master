import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import css from './styles.less'

export default class Badges extends React.Component {
  static defaultProps = {
    items: [
      {
        value: 'all',
        name: 'все',
        url: '/learn',
      },
      {
        value: 'read',
        name: 'читать',
        url: '/learn/blog',
      },
      {
        value: 'watch',
        name: 'смотреть',
        url: '/learn/videos',
      },
      {
        value: 'teach',
        name: 'учиться',
        url: '/learn/courses',
      },
      {
        value: 'listen',
        name: 'действовать',
        url: '/learn/trajectories',
      },
    ],
    title: 'Я хочу',
    className: '',
  }

  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
  }

  state = {}

  render () {
    const { title, className, items } = this.props
    const rootClass = cn(css.root, className)

    return (
      <div className={rootClass}>
        <div className={css.title}>{title}</div>
        <div className={css.list}>
          {items.map((e, i) => (
            <div key={i} className={css.listItem}>
              <NavLink exact to={e.url} activeClassName={css.active} className={css.listLink}>
                {e.name}
              </NavLink>
            </div>
          ))}
        </div>
        <div className={css.tableResponsive}>
          <table className={css.mobileList}>
            <tbody>
              <tr>
                {items.map((e, i) => (
                  <td key={i} className={css.mobileListItem}>
                    <NavLink exact to={e.url} activeClassName={css.active} className={css.listLink}>
                      {e.name}
                    </NavLink>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
