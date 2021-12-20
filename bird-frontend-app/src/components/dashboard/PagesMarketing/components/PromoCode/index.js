import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Input } from 'antd'
import { Button } from '..'
import { checkCode } from 'modules/marketing/actions'
import css from './index.less'

const PromoCode = ({ setBonus, coupon, setCoupon }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { alias } = useParams()

  const apiPromoCode = () => {
    setLoading(true)
    dispatch(checkCode(alias, coupon))
      .then(res => setBonus(res?.bonus))
      .finally(() => setLoading(false))
  }

  const checkPromoCode = e => {
    if (e.key === 'Enter') apiPromoCode()
  }

  return (
    <div className={css.container}>
      <div className={css.wrapperInput}>
        <Input
          placeholder='Gift card or discount code'
          className={css.input}
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          onKeyDown={checkPromoCode}
          disabled={loading}
        />
        <Button
          title='Apply'
          customClass={css.btnSubmit}
          onClick={apiPromoCode}
          loading={loading}
          disabled={loading || !coupon}
        />
      </div>
    </div>
  )
}

export default PromoCode
