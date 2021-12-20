import React from 'react'
import css from '../../index.less'
import c from 'classnames'

const Information = ({ item: { title, text }, index, lastIndex }) => (
  <div className={title === 'Password' ? css.wrapperPassword : css.wrapperInformation}>
    <div className={css.left}>{title}</div>
    {title === 'Photo'
      ? <img className={c(css.right, css.avatar)} src={text} />
      : <div className={c(css.right, { [css.rightEmail]: title === 'Email' })}>{text}</div>}
  </div>
)

export default Information
