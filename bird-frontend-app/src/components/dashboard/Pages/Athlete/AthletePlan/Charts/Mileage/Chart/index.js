import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import moment from 'moment'
// import PaidFooter from 'components/Modals/DetailWorkout/PaidFooter'
import c from 'classnames'
import { timeFormat } from 'utils'
import css from './index.less'

const attrAxis = { textAnchor: 'middle', fontWeight: '900', fontSize: '10', fill: '#a0a0a0', fontFamily: 'SFProDisplay-Bold' }

export const converTime = seconds => {
  const h = seconds / 3600 ^ 0
  const m = (seconds - h * 3600) / 60 ^ 0
  const s = seconds - h * 3600 - m * 60

  return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
}

const CustomizedXAxisTick = memo(({ x = 1, y = 1, payload, numChart, index }) => {
  const { measurement } = useSelector(({ session }) => session)

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} dx={-10} {...attrAxis}>{numChart === 3 ? `${index + 1} ${measurement === 1 ? 'mi' : 'km'}` : payload?.value}</text>
    </g>
  )
})

const CustomizedYAxisTick = memo(({ x = 1, y = 1, payload, numChart, data, index, activeTab }) => {
  const { measurement } = useSelector(({ session }) => session)

  return (
    <g transform={`translate(${x},${y})`}>
      <text dx={activeTab === 1 ? -10 : -20} dy={5} {...attrAxis}>{
        numChart === 3
          ? index === data?.length - 1
            ? measurement === 1 ? '/mi' : '/km'
            : activeTab === 2 ? `${payload?.value?.toString()}:00` : payload?.value?.toString()
          : activeTab === 2 ? converTime(payload?.value) : payload?.value
      }
      </text>
    </g>
  )
})

const Chart = ({ data, currentWeek, total, ran, chartForBack, phases, numChart, onChangeChart, onChangeWeek, onChangeDay, activeDay, activeTab, totalWeeks }) => {
  const [arrY, setArrY] = useState([])
  const [arrX, setArrX] = useState([])

  useEffect(() => {
    if (numChart === 1) {
      const arrX = []

      data.forEach(i => {
        if (!arrX.includes(i?.name)) {
          arrX.push(i?.name)
        }
      })

      setArrX(arrX)
    } else if (numChart === 3) {
      const dataPace = data?.map(i => i.pace)
      const dataName = data?.map(i => i.name)

      const minY = Math.min(...dataPace)
      const maxY = Math.max(...dataPace)

      const minX = Math.min(...dataName)
      const maxX = Math.max(...dataName)

      const arrY = []
      const arrX = []

      for (let i = Math.round(minY) - 1; i <= Math.round(maxY) + 1; i++) {
        arrY.push(i)
      }

      for (let i = Math.round(minX); i < Math.round(maxX) + 1; i++) {
        arrX.push(i)
      }

      setArrY(arrY)
      setArrX(arrX)
    }
  }, [data, numChart])

  const tooltip = item => {
    if (numChart === 3) {
      const time = timeFormat(item?.payload[0]?.payload?.uv * 60)

      if (time) {
        return (
          <div className={css.customTooltip}>
            <div className={css.label}>{time} MIN /MI</div>
          </div>
        )
      }
    }

    return (
      <div className={css.customTooltip}>
        <div className={css.label}>click to view details</div>
      </div>
    )
  }

  const onClick = (e, payload) => {
    if (numChart === 1) {
      for (const phase of phases) {
        for (const week of phase.weeks) {
          if (week.numberOfWeek === payload?.payload?.week) {
            onChangeWeek(week)
            onChangeChart(2, `Week ${week.numberOfWeek} of ${totalWeeks}`, week)
          }
        }
      }
    } else if (numChart === 2) {
      const week = payload?.payload

      const day = week?.week?.workouts?.find(i => moment(i.date).format('ddd') === week?.name)

      if (day) {
        onChangeDay(day)
        onChangeChart(3, moment(day.date).format('LL'), day)
      }
    }
  }

  const attrDot = { onClick, strokeWidth: 3, cursor: 'pointer' }

  // if (numChart === 3 && coachPlan?.coachPlanId === 1) {
  //   return <PaidFooter />
  // }

  return data?.length > 1 ? (
    <ResponsiveContainer width='100%' height='95%'>
      <LineChart data={data} className={c(css.chart, { [css.chartLast]: numChart === 3 })}>
        <CartesianGrid />
        {numChart === 3 ? (
          <XAxis tick={<CustomizedXAxisTick numChart={numChart} />} />
        ) : (
          <XAxis
            type={numChart === 3 ? 'number' : 'category'}
            dataKey='name'
            tickCount={data?.length}
            axisLine={numChart !== 3}
            tick={<CustomizedXAxisTick numChart={numChart} />}
            domain={['dataMin', 'dataMax']}
            interval={0}
            ticks={numChart === 3 || numChart === 1 ? arrX : null}
          />
        )}
        {numChart === 3 ? (
          <YAxis
            reversed={numChart === 3}
            interval={0}
            ticks={arrY}
            domain={['dataMin', 'dataMax']}
            tick={<CustomizedYAxisTick activeTab={activeTab} data={arrY} numChart={numChart} />}
          />
        ) : (
          <YAxis tick={<CustomizedYAxisTick numChart={numChart} activeTab={activeTab} />} />
        )}

        <Tooltip content={tooltip} />

        {numChart === 3 && (
          <ReferenceLine
            y={activeDay?.avgPace?.includes(':') ? +activeDay?.avgPace?.replace(/\:/g, '.') : activeDay?.avgPace}
            strokeWidth={1}
            label=''
            stroke='#000000'
            strokeDasharray='20 10'
          />
        )}
        {numChart !== 3 && (
          <Line
            type='monotone'
            dataKey='pv'
            stroke='#AAAAAA'
            dot={false}
            activeDot={{ ...attrDot, stroke: '#a0a0a0' }}
            strokeDasharray='5 5'
            strokeWidth={2}
          />
        )}
        <Line
          type='monotone'
          dataKey='uv'
          stroke='#397035'
          dot={false}
          activeDot={{ ...attrDot, stroke: '#397035' }}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : <div className={css.line} />
}

export default memo(Chart)
