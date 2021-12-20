import React from 'react'
import { EcoFormDatePicker } from 'components'
import { ConfigProvider } from 'antd'
import en_GB from 'antd/lib/locale-provider/en_GB'
import moment from 'moment'

const InputDate = ({ name = '' }) => {
  const currentMon = moment(moment().startOf('week'))
  const daysMon = []

  const disabledDate = d => {
    const mon = moment(moment(d).startOf('week'))

    if (daysMon.length !== 5 && mon <= currentMon && !daysMon.includes(mon.format('YYYY-MM-DD'))) {
      daysMon.push(mon.format('YYYY-MM-DD'))
    }

    const newDaysMon = daysMon.length === 5 ? daysMon.slice(daysMon.length - 5) : daysMon

    return d && (d.weekday() !== 0 || d < moment().startOf('day')) && (!newDaysMon.includes(moment(d).format('YYYY-MM-DD')))
  }

  return (
    <ConfigProvider locale={en_GB}>
      <EcoFormDatePicker
        disabledDate={disabledDate}
        options={{
          rules: [{ type: 'object', required: true, message: 'Date can not be empty.' }],
          valuePropName: 'defaultValue',
          value: moment,
        }}
        placeholder=''
        label=''
        autoComplete='off'
        prefix={false}
        size='default'
        name={name}
      />
    </ConfigProvider>
  )
}

export default InputDate
