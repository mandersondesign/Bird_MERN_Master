import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateMeasurement } from 'modules/session/session-actions'
import { Radio } from 'antd'
import css from '../index.less'

const Measurements = () => {
  const { measurement, user } = useSelector(state => state.session)
  const [value = measurement, setValue] = useState()
  const dispatch = useDispatch()

  const onChange = e => {
    setValue(e.target.value)
    dispatch(updateMeasurement(user?.userId, { measurementId: e.target.value }))
  }

  return (
    <div className={[css.sectionProfile, css.sectionProfileRow].join(' ')}>
      <div className={css.left}>Measurements</div>

      <Radio.Group onChange={onChange} value={value} className={css.group}>
        <Radio value={2} className={css.radio}>Kilometers</Radio>
        <Radio value={1} className={css.radio}>Miles</Radio>
      </Radio.Group>
    </div>
  )
}

export default Measurements
