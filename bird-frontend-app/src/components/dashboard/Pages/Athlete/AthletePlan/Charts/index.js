import React, { memo } from 'react'
// import Benchmark from './Benchmark'
import Mileage from './Mileage'
// import Workouts from './Workouts'
import css from './index.less'

const Charts = ({ data, lineChart }) => {
  // const workouts = data?.meta?.workouts
  return (
    <div className={css.wrapperCharts}>
      <Mileage data={data} lineChart={lineChart} />

      {/* <div className={css.rowCharts}>
        <Workouts workouts={workouts} />
        <Benchmark />
      </div> */}
    </div>
  )
}

export default memo(Charts)
