import React, { memo } from 'react'
import { VictoryPie, Slice } from 'victory'
import css from './index.less'

const Chart = ({ total, assigned, completed }) => {
  const completedMiles = Math.round(completed)
  const assignedMiles = Math.round(assigned)
  const totalMiles = Math.round(total)

  const assignedMilesDiff = assignedMiles - completedMiles

  const data = [
    { x: 'A', y: completedMiles },
    { x: 'B', y: assignedMilesDiff },
    { x: 'C', y: totalMiles - Math.max(completedMiles, assignedMiles) },
  ]

  const completedPercent = completedMiles / totalMiles
  // const assignedPercent = assignedMiles / totalMiles

  const completedLength = 360 * completedPercent
  const completedLengthNormalized = completedLength - 180

  const assignedDiffPercent = assignedMilesDiff / totalMiles
  const assignedDiffLength = assignedDiffPercent * 360

  const completedMilesEnd = completedLengthNormalized
  const assignedMilesEnd = completedLengthNormalized + assignedDiffLength

  const sliceStartAngle = datum => {
    if (datum.x === 'A') return -180
    if (datum.x === 'B') return completedMilesEnd - 5

    return assignedMilesEnd - 5
  }

  const sliceEndAngle = datum => {
    if (datum.x === 'A') return completedMilesEnd + 5
    if (datum.x === 'B') return assignedMilesEnd

    return 186
  }

  return (
    <div className={css.wrapperSvg}>
      <svg viewBox='0 0 350 400' width='100%' height='100%'>
        <VictoryPie
          sortOrder='descending'
          sortKey='x'
          standalone={false}
          dataComponent={
            <Slice
              sliceStartAngle={({ datum }) => sliceStartAngle(datum)}
              sliceEndAngle={({ datum }) => sliceEndAngle(datum)}
            />
          }
          innerRadius={120}
          cornerRadius={25}
          data={data}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const obj = {
                  A: '#3c6f38',
                  B: '#B5C8B3',
                  C: '#FFFFFF',
                }

                return obj[datum.x] || obj.C
              },
            },
          }}
        />
      </svg>
      <div className={css.wrapperTexts}>
        <div className={css.textCompleted}>{completedMiles}</div>
        <div className={css.textAssigned}>/{assignedMiles}</div>
      </div>
    </div>
  )
}

export default memo(Chart)
