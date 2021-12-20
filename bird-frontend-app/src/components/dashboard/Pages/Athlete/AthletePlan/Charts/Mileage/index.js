import React, { useState, useEffect, memo } from 'react'
import { useDispatch } from 'react-redux'
import { getChartWeeks, getChartWeek, getChartWorkout } from 'modules/plans/plans-actions'
import c from 'classnames'
import { Button } from 'components'
import moment from 'moment'
import Header from './Header'
import Chart from './Chart'
import css from './index.less'

const Mileage = ({ data, lineChart }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [numChart, setNumChart] = useState(1)
  const [title, setTitle] = useState('Plan Overview')
  const [activeWeek, setActiveWeek] = useState({})
  const [activeDay, setActiveDay] = useState({})
  const [dataChart, setDataChart] = useState([])
  const [chartForBack, setChartForBack] = useState([])
  const [milesRan = data?.meta?.miles?.ran, setMilesRan] = useState(0)
  const [milesAssigned = data?.meta?.miles?.assigned, setMilesAssigned] = useState(0)
  const dispatch = useDispatch()

  const assignedTime = data?.meta?.time?.assigned
  const completedTime = data?.meta?.time?.completed
  const currentWeek = data.meta.weeks.current || 0
  const totalWeeks = data?.meta?.weeks?.total || 0
  const totalMiles = data?.meta?.miles?.total || 0
  const assignedMiles = data?.meta?.miles?.assigned || 0

  const arrayLineChart = lineChart.lineChart || []
  // const arrayCompletedData = lineChart.completedData || []
  const nullWeek = { pv: 0, name: '', week: 0, phase: 0, uv: 0, time: 0 }

  if (!arrayLineChart.length) return null

  const getValue = val => val === -1 || val === undefined || val === null ? 0 : val

  useEffect(() => {
    if (numChart === 1) {
      setChart_1(1)
    } else if (numChart === 2) {
      setChart_2()
    } else {
      setChart_3()
    }
  }, [data])

  const goBack = () => {
    if (numChart === 3) {
      setChart_2(activeTab)
    } else {
      setChart_1(activeTab)
    }
  }

  const setChart_1 = tab => {
    const id = window.location.pathname.split('/')[2]

    let newLineChart = []

    dispatch(getChartWeeks(id)).then(({ data = [], completedData = [] }) => {
      newLineChart = data.map(i => {
        const completedWeek = completedData.find(j => j.day === i.day)
        const week = { pv: tab === 2 ? i.time : i.distance, name: `W${i.week}`, week: i.week, phase: i.phase }

        return completedWeek ? { ...week, uv: tab === 2 ? completedWeek.time : completedWeek.distance } : { ...week, uv: null }
      })

      newLineChart = [nullWeek, ...newLineChart].map(item => item.week <= currentWeek ? { ...item } : { ...item, uv: null })

      setMilesRan(data?.meta?.miles?.ran)
      setMilesAssigned(data?.meta?.miles?.assigned)

      setTitle('Plan Overview')
      setDataChart(newLineChart)

      setNumChart(1)
      setActiveTab(tab)
    })
  }

  const setChart_2 = (actualWeek, tab) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    dispatch(getChartWeek(actualWeek?.weekId || activeWeek?.weekId)).then(({ completedData = [], data = [] }) => {
      let completedDistance = 0

      let newCompletedData = []

      if (completedData?.length) {
        for (let i = 0; i < completedData[completedData.length - 1].day; i++) {
          const day = completedData.find(j => j.day === i + 1)
          const obj = day ? { ...day } : { hasWorkout: true, distance: 0, time: 0, day: i + 1, week: actualWeek?.numberOfWeek || activeWeek?.numberOfWeek }

          newCompletedData = [...newCompletedData, obj]
        }
      } else {
        newCompletedData = [...completedData]
      }

      const newLineChart = data.map((i, ind) => {
        const completedDay = newCompletedData.find(j => j.day === i.day)

        const day = {
          pv: tab === 2 ? getValue(i.time) : getValue(i.distance),
          name: days[i.day - 1],
          week: actualWeek || activeWeek,
          day: i.day,
        }

        return completedDay
          ? {
            ...day,
            uv: completedDay ? tab === 2 ? getValue(completedDay.time) : getValue(completedDay?.distance) : 0,
          }
          : { ...day, uv: null }
      })

      for (const i of (actualWeek?.workouts || activeWeek?.workouts)) {
        completedDistance += i.completedDistance
      }

      setTitle(`Week ${actualWeek?.numberOfWeek || activeWeek?.numberOfWeek} of ${totalWeeks}`)
      setDataChart(newLineChart)

      setMilesRan(completedDistance)
      setMilesAssigned(actualWeek?.milesPerWeek || activeWeek?.milesPerWeek)

      setActiveTab(tab)
      setNumChart(2)
    })
  }

  const setChart_3 = (actualDay, tab) => {
    dispatch(getChartWorkout(actualDay?.workoutId || activeDay?.workoutId)).then(({ data = [] }) => {
      let sum = 0

      for (const pace of data) {
        sum += pace.pace
      }

      let newLineChart = data.map((i, ind) => ({
        pace: i?.pace,
        uv: i.pace,
        name: tab === 2 ? +i?.distance?.toFixed(2) : +i.time,
        week: activeWeek,
        day: actualDay || activeDay,
        average: sum / data.length,
      }))

      newLineChart = newLineChart.map(i => ({ ...i, uv: i.uv === -1 ? null : i.uv }))

      setTitle(moment(actualDay?.date || activeDay?.date).format('MMMM D, YYYY'))
      setDataChart(newLineChart)
      setNumChart(3)
      setActiveTab(tab)
    })
  }

  const onChangeWeek = week => setActiveWeek(week)
  const onChangeDay = day => setActiveDay(day)

  const onChangeChart = (num, title, actualDate) => {
    if (num === 2) {
      setChart_2(actualDate, activeTab)
    } else if (num === 3) {
      setChart_3(actualDate, activeTab)
    }

    setTitle(title)
  }

  const onChangeTab = tab => {
    if (numChart === 1) {
      setChart_1(tab)
    } else if (numChart === 2) {
      setChart_2(null, tab)
    } else if (numChart === 3) {
      setChart_3(null, tab)
    }
  }

  const attrChart = {
    data: dataChart,
    currentWeek,
    total: data.meta.miles.assigned || 0,
    ran: data.meta.miles.ran || 0,
    phases: data?.data?.phases,
    numChart,
    onChangeChart,
    onChangeWeek,
    onChangeDay,
    activeDay,
    totalWeeks,
    activeTab,
    activeWeek,
    chartForBack,
    setChartForBack,
  }

  return (
    <div className={css.wrapperMileage}>
      <div className={css.tabs}>
        <Button
          btnText={`< back to ${numChart === 2 ? 'Plan' : 'Week'}`}
          className={c(css.btnBack, { [css.hiddenBtn]: numChart === 1 })}
          onClick={goBack}
        />

        <div className={css.right}>
          <div className={c(css.tab, { [css.activeTab]: activeTab === 1 })} onClick={() => onChangeTab(1)}>Distance</div>
          <div className={c(css.tab, { [css.activeTab]: activeTab === 2 })} onClick={() => onChangeTab(2)}>Time</div>
        </div>
      </div>

      <Header
        title={title}
        milesRan={milesRan}
        milesAssigned={milesAssigned}
        time={numChart === 3 && '00:50:12'}
        activeDay={activeDay}
        numChart={numChart}
        activeTab={activeTab}
        assignedTime={assignedTime}
        completedTime={completedTime}
        assignedMiles={assignedMiles}
        activeWeek={activeWeek}
        totalMiles={totalMiles}
      />

      <div className={css.body} style={{ height: '250px' }}>
        {lineChart.lineChart ? <Chart {...attrChart} /> : null}
      </div>
    </div>
  )
}

export default memo(Mileage)
