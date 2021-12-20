import React from 'react'
import { VictoryPie, Slice } from 'victory'
import css from './index.less'

const prepareData = (_assigned, _completed) => {
  const data = []
  const assigned = +_assigned
  const completed = +_completed

  if (!assigned && !completed) {
    data.push({ x: 'A', y: 1 })
  } else {
    const diff = assigned > completed ? assigned - completed : 0
    data.push({ x: 'A', y: +completed })
    data.push({ x: 'B', y: diff })
  }
  return data
}

const Circle = ({ assigned, completed, title }) => {
  const sliceStartAngle = ({ datum }) => {
    return datum.x === 'B' ? datum.startAngle + 5 : datum.startAngle
  }

  const sliceEndAngle = ({ datum }) => {
    return datum.x === 'B' ? datum.endAngle - 5 : datum.endAngle
  }

  const defendCorner = ({ datum }) => {
    return datum.x === 'A' ? 25 : 0
  }
  const dataComponent = (<Slice sliceStartAngle={sliceStartAngle} sliceEndAngle={sliceEndAngle} />)
  const transformTo = d => Number(d) ? completed?.toFixed(1) : '-'
  const data = prepareData(assigned, completed)
  const colors = data?.length > 1 ? ['#B5C8B3', '#3c6f38'] : ['#fff']
  const isAnimate = { duration: 1500 }
  return (
    <div className={css.wrapperSvg}>
      <svg viewBox='0 0 350 400' width='100%' height='100%'>
        <VictoryPie
          sortOrder='descending'
          sortKey='x'
          standalone={false}
          colorScale={colors}
          animate={isAnimate}
          startAngle={180}
          endAngle={-180}
          dataComponent={dataComponent}
          innerRadius={120}
          cornerRadius={defendCorner}
          data={prepareData(assigned, completed)}
          labels={() => null}
        />
      </svg>
      <div className={css.wrapperTexts}>
        <div className={css.flex}>
          <div className={css.textCompleted}>{transformTo(completed)}</div>
          <div className={css.textAssigned}>/{assigned?.toFixed(1)}</div>
        </div>
        {title && <div className={css.title}>{title}</div>}
      </div>
    </div>
  )
}

export default Circle
