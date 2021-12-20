import React from 'react'
import { NavLink } from 'components'
import { year } from 'utils'
import css from './styles.less'

function Footer () {
  return (
    <div className={css.root}>
      <div className={css.text}>
        <NavLink className={css.link} to='/'>
          Privacy policy
        </NavLink>
        <NavLink className={css.link} to='/'>
          Terms and conditions
        </NavLink>
      </div>
      <div className={css.text}>{`©Touchstone Crystal Inc. ${year()}, All rights reserved.`}</div>
    </div>
  )
}

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
