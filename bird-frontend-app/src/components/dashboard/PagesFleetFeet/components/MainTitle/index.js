import React from 'react'
import css from './index.less'

const MainTitle = ({ title = '' }) => {
  return (
    <div className={css.wrapperMainTitle}>
      {title}
    </div>
  )
}

export default MainTitle
