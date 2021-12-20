import React from 'react'
import { useSelector } from 'react-redux'
import { Skeleton } from 'antd'
import c from 'classnames'
import css from './index.less'

const YourOrder = () => {
  const { event } = useSelector(state => state.feet)

  return (
    <div className={css.wrapperYourOrder}>
      {event?.eventId ? (
        <>
          <div className={css.mainTitle}>Your Order</div>

          <div className={c(css.row, css.firstRow)}>
            <div className={css.title}>{event.name}</div>
            <div className={css.price}>${event.price}</div>
          </div>

          <div className={c(css.row, css.rowMargin)}>
            <div className={c(css.title, css.boldText)}>Subtotal:</div>
            <div className={css.price}>${event.price}</div>
          </div>

          <div className={css.row}>
            <div className={c(css.title, css.boldText)}>Stripe credit card processing fee:</div>
            <div className={c(css.price, css.priceDescription)}>${(+event?.fee).toFixed(2)} ({event.feeDescription})</div>
          </div>

          <div className={css.line} />

          <div className={css.row}>
            <div className={c(css.title, css.boldText)}>Total:</div>
            <div className={c(css.price, css.boldText)}>${event.total}</div>
          </div>
        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  )
}

export default YourOrder
