import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import styles from './styles.less'

class MenuList extends React.Component {
  state = {}

  render () {
    const { list, isOpen } = this.props

    return (
      <div className={styles.root}>
        {list.map((e, i) => (
          [
            <span key={i} className={styles.columnTitle}>{e.title}</span>,
            <ul key={i} className={styles.column}>
              {isOpen && e.items.map((item, index) => (
                <li className={styles.columnItem} key={index}>
                  <NavLink to={item.url} className={styles.columnItemLink} activeClassName={styles.columnItemLinkActive}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>,
          ]
        ))}
      </div>
    )
  }
}

MenuList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
}

MenuList.defaultProps = {
  list: [],
  isOpen: true,
}

export default MenuList
