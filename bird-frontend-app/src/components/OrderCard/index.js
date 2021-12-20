import React from 'react'
import { Skeleton } from 'antd'
import c from 'classnames'
import css from './index.less'

const Price = ({ label, price }) => (
  <div className={css.wrapperPrice}>
    <div className={css.label}>{label}</div>
    <div className={[css.label, css.labelPrice].join(' ')}>{price}</div>
  </div>
)

const OrderCard = ({ children, customClass, data, totalPrice, coupon, bonus = 0 }) => {
  return (
    <div className={c(css.container, customClass)}>
      {totalPrice === undefined ? (
        <Skeleton active />
      ) : (
        <>
          <div className={css.mainTitle}>Order Summary</div>
          <div className={css.prices}>
            <div className={[css.wrapperPrice, css.borderBottom].join(' ')}>
              <div className={css.label}>{data.service.label}</div>
              <div className={[css.label, css.labelPrice, css.bold].join(' ')}>{data.service.price}</div>
            </div>
            {children}
            {bonus ? <Price label={`Promo Code “${coupon}“ applied`} price={`-$${bonus}`} /> : null}
          </div>

          <div className={css.wrapperTotal}>
            <div className={css.label}>Total: </div>
            <div className={[css.label, css.labelPrice].join(' ')}>${(totalPrice)}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderCard
