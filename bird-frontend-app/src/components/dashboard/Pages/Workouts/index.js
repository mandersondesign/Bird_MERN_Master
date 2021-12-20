import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getWorkouts, getAllWorkouts, getTypesWorkout, delWorkout } from 'modules/workouts/workouts-actions'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { CoachDashboardContainer, Header } from '../../components'
import { debounce } from 'lodash'
import HeaderWorkouts from './Header'
import TableWorkouts from './TableWorkouts'
import PaginationWorkouts from './PaginationWorkouts'
import css from './index.less'

const Workouts = () => {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState('last_update')
  const [sortDirection, setSortDirection] = useState('desc')
  const [sortType, setSortType] = useState({ name: 0, title: 'Choose type' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWorkouts(1000, page, sortType.name || '', sortField, sortDirection))
  }, [])

  useEffect(() => {
    getWorkoutsList(page)
    dispatch(getTypesWorkout())
  }, [page, sortField, sortDirection, sortType])

  const getWorkoutsList = (page = 1) => {
    setLoading(true)
    dispatch(getWorkouts(10, page, sortType.name || '', sortField, sortDirection)).then(() => {
      dispatch(getAthletesMeta())
      setLoading(false)
    })
  }

  const deleteWorkout = async id => {
    await dispatch(delWorkout(id))
    getWorkoutsList(page)
  }

  const onSorted = item => {
    setSortField(item.name)
    setSortDirection(item.direction)
  }

  const onSortedType = item => setSortType(item)

  const onChangePagination = debounce(page => {
    setPage(page)
    window.scrollTo(0, 0)
  }, 250)

  const attrHeader = { onSorted, onSortedType, getWorkoutsList }

  return (
    <CoachDashboardContainer>
      <Header title='My Library' subTitle='Workouts' />
      <div className={css.wrapperWorkouts}>
        <HeaderWorkouts {...attrHeader} />
        <TableWorkouts loading={loading} deleteWorkout={deleteWorkout} getWorkoutsList={getWorkoutsList} />
        <PaginationWorkouts page={page} onChangePagination={onChangePagination} />
      </div>
    </CoachDashboardContainer>
  )
}

export default Workouts
