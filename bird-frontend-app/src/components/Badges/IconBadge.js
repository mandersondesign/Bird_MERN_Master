import React from 'react'
import css from './iconBadge.less'
import manRunning from 'assets/man-running.png'
import book from 'assets/open-book.png'
import athleticShoe from 'assets/running-shoe.png'

export default ({ name }) => {
  const images = { athleticShoe, book, manRunning }
  return (
    <div className={css.root}>
      <img src={images[name]} className={css.img} />
    </div>
  )
}
