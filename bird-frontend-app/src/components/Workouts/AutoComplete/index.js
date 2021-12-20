import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWorkouts } from 'modules/workouts/workouts-actions'
import { AutoComplete, Select } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import c from 'classnames'
import css from './index.less'

const { Option } = Select

const WorkoutAutoComplete = setWorkout => {
  const [isArrow, setIsArrow] = useState(false)
  const { workouts = [] } = useSelector(state => state.workouts)
  const dispatch = useDispatch()

  const onChangeArrow = () => setIsArrow(!isArrow)

  const onSearch = value => {
    if (value?.length >= 3) {
      dispatch(getAllWorkouts(null, null, null, null, null, value))
    }

    if (!value?.length) {
      dispatch(getAllWorkouts())
    }
  }

  useEffect(() => {
    dispatch(getAllWorkouts())
  }, [])

  return (
    <div className={css.wrapperAutoComplete}>
      <DownOutlined className={c(css.iconArrow, { [css.iconArrowActive]: isArrow })} />
      <AutoComplete onDropdownVisibleChange={onChangeArrow} dataSource={workouts} onSearch={onSearch} placeholder='Choose from library'>
        {workouts.map(workout => <Option value={workout?.workoutLibraryId?.toString()} onClick={() => setWorkout(workout)} key={workout.workoutLibraryId}>{workout.name}</Option>)}
      </AutoComplete>
    </div>
  )
}

export default WorkoutAutoComplete
