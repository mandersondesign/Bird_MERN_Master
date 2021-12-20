import React from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, ResponsiveContainer, ReferenceLine, YAxis, XAxis, CartesianGrid, Tooltip } from 'recharts'
import { timeFormat } from 'utils'
import css from './index.less'

const attrAxis = { textAnchor: 'middle', fontWeight: '900', fontSize: '10', fill: '#a0a0a0', fontFamily: 'SFProDisplay-Bold' }

const CustomizedXAxisTick = ({ x, y, payload, index }) => {
  const { measurement } = useSelector(({ session }) => session)

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} dx={-15} {...attrAxis}>{`${index + 1} ${measurement === 1 ? 'mi' : 'km'}`}</text>
    </g>
  )
}

const CustomizedYAxisTick = ({ x, y, payload, index, data }) => {
  const { measurement } = useSelector(({ session }) => session)

  return (
    <g transform={`translate(${x},${y})`}>
      <text dx={-10} dy={5} {...attrAxis}>{index === data?.length - 1 ? `/${measurement === 1 ? 'mi' : 'km'}` : `${payload?.value?.toString()}:00`}</text>
    </g>
  )
}

const Chart = ({ data, avgPace, reversedY = true }) => {
  const dataPace = data?.map(i => i.uv)
  const dataDistance = data?.map(i => i.distance)

  const min = Math.min(...dataPace)
  const max = Math.max(...dataPace)

  const minX = Math.min(...dataDistance)
  const maxX = Math.max(...dataDistance)

  const ticksY = []
  const ticksX = []

  for (let i = Math.round(min) - 1; i <= Math.round(max) + 1; i++) {
    ticksY.push(i)
  }

  for (let i = Math.round(minX); i < Math.round(maxX) + 1; i++) {
    ticksX.push(i)
  }

  const tooltip = item => {
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
    <ResponsiveContainer width='100%' height={150}>
      <LineChart data={data}>
        <CartesianGrid />

        <ReferenceLine y={avgPace} label='' stroke='#BBBBBB' strokeDasharray='3 3' />

        <XAxis
          // type='number'
          // dataKey='name'
          // tickCount={ticksX?.length}
          tick={<CustomizedXAxisTick />}
          // domain={['dataMin', 'dataMax']}
          // interval={0}
          // ticks={[...ticksX]}
        />

        <Line
          type='monotone'
          dataKey='uv'
          stroke='#397035'
          dot={false}
          strokeWidth={3}
          activeDot={{ strokeWidth: 5, stroke: '#397035' }}
        />

        <YAxis
          reversed
          interval={0}
          ticks={ticksY}
          domain={['dataMin', 'dataMax']}
          tick={<CustomizedYAxisTick data={ticksY} />}
        />

        <ReferenceLine
          y={avgPace?.includes(':') ? avgPace?.replace(/\:/g, '.') : avgPace}
          strokeWidth={1}
          label=''
          stroke='#000000'
          strokeDasharray='20 10'
        />

        <Tooltip content={tooltip} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
