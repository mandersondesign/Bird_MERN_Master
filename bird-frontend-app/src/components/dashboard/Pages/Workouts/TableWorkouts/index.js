import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchOfWorkout } from 'modules/sidenav/sidenav-actions'
import { Popover, Popconfirm } from 'antd'
import moment from 'moment'
import Table from 'components/Table'
import { columns } from 'components/Test/data'
import Tooltip from 'components/Tooltip'
import { Icon } from 'components/CustomIcon'
import { FormWorkout } from 'components'
import css from './index.less'

const TableWorkouts = ({ loading, deleteWorkout, getWorkoutsList }) => {
  const [flagDescriptionForLinks, setFlagDescriptionForLinks] = useState(true)
  const [visibleEdit, setVisibleEdit] = useState(null)
  const { workouts = [], allWorkouts = [] } = useSelector(state => state.workouts)
  const { workoutId } = useSelector(state => state.sidenav)
  const dispatch = useDispatch()
  const isShow = useRef(null)

  useEffect(() => {
    if (allWorkouts.length && workoutId && !loading) {
      const activeWrkt = allWorkouts.find(i => i.workoutLibraryId === +workoutId)
      setVisibleEdit(activeWrkt)
    }
  }, [allWorkouts, workoutId, loading])

  const clickPopoverEdit = ({ workout, show = false, update = false, prev }) => {
    setVisibleEdit(show && workout ? workout : null)
    if (workoutId) dispatch(searchOfWorkout(null))
    if (visibleEdit && update && workout?.workoutLibraryId !== visibleEdit?.workoutLibraryId) getWorkoutsList()
  }

  const libraryName = isEditing => (name, workout) => {
    const onMouseDown = () => {
      // trick with ref for toggle visibility popover
      isShow.current = !isEditing?.workoutLibraryId || isEditing?.workoutLibraryId !== workout?.workoutLibraryId
    }
    const onMouseUp = () => clickPopoverEdit({ workout, show: isShow.current })
    return (
      <div className={css.wrapperName} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        {workout?.name}
      </div>
    )
  }

  const type = (name, workout) => (
    <div>
      {workout?.workoutType?.name || ''}
    </div>
  )

  const lastUpdate = name => (
    <div>
      {moment(name).fromNow()}
    </div>
  )

  const actions = (name, workout) => (
    <div className={css.wrapperActions}>
      <Popover
        trigger='click'
        content={
          <FormWorkout
            updateVisible={() => clickPopoverEdit({ update: true })}
            setFlagDescriptionForLinks={setFlagDescriptionForLinks}
            descriptionForLinks={flagDescriptionForLinks}
            popupForLibraryEdit
            popupForLibrary
            workoutFromLibrary={workout}
          />
        }
        visible={visibleEdit?.workoutLibraryId === workout.workoutLibraryId}
        onVisibleChange={show => clickPopoverEdit({ workout, show })}
        overlayClassName={css.popoverFormWorkout}
        getPopupContainer={node => node?.parentNode}
      >
        <Tooltip
          content={<Icon type='edit' size='medium' onClick={() => clickPopoverEdit({ workout, show: true })} />}
          className={css.iconAction}
          title='EDIT'
        />
      </Popover>
      <Popconfirm
        className={css.iconAction}
        title='Are you sure you want to delete this workout?'
        okText='Yes'
        cancelText='No'
        onConfirm={() => deleteWorkout(workout.workoutLibraryId)}
        getPopupContainer={node => node?.parentNode}
      >
        <Tooltip title='DELETE' content={<Icon type='trash' size='medium' />} />
      </Popconfirm>
    </div>
  )

  return (
    <Table
      className={css.tableOfWorkouts}
      loading={loading}
      customColumns={columns.workouts({ libraryName: libraryName(visibleEdit), type, lastUpdate, actions })}
      dataSource={workouts}
    />
  )
}

export default TableWorkouts
