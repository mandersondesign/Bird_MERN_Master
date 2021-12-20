import React, { useState, useRef, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteWeek, copyWeek } from 'modules/plans/plans-actions'
import {
  updateWeek,
  editWorkout,
  createWorkout,
  delWorkout,
  getTypesWorkout,
} from 'modules/athlets/athlets-actions'
import * as libraryActions from 'modules/workouts/workouts-actions'
import { Draggable } from 'react-beautiful-dnd'
import { Input, Popconfirm, notification } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { WorkoutCard, ModalDetailWorkout, ModalFormWorkout } from 'components'
import { Icon } from 'components/CustomIcon'
import moment from 'moment'
import { showSuccess } from 'utils'
import css from './index.less'

import ImgDrag from '../../../PlanTemplate/Phases/drag_24x24.svg'

const { TextArea } = Input

const ListWeeks = ({
  phases,
  week,
  numberWeek,
  index,
  getPlan,
  currentWeeks,
  meta,
}) => {
  const [valueInput = week.description, setValueInput] = useState()
  const [isInput, setIsInput] = useState(false)
  const [isloadingSave, setIsloadingSave] = useState(false)
  const [isloadingLibrary, setIsloadingLibrary] = useState(false)
  const [isloadingDel, setIsloadingDel] = useState(false)
  const [activeWorkout, setActiveWorkout] = useState()
  const state = useSelector(state => state.athlets)
  const dispatch = useDispatch()
  const { athleteId } = useParams()
  const inputRef = useRef(null)

  const workout = week.workouts[0]

  useEffect(() => {
    if (week.description !== valueInput) setValueInput(week.description)
  }, [week.description])

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus()
  }, [isInput])

  const onSubmit = (form, workout, customType, setCustomType) => {
    form.validateFields((err, values) => {
      if (err) return null
      setIsloadingSave(true)

      const { name, pace, type, distance, description, time } = values

      let obj = { name, description, paceId: pace, workoutTypeId: type }

      if (distance !== undefined) {
        obj.distance = distance
      }
      if (time !== undefined) {
        obj.time = moment(time).format('HH:mm')
      }

      const activePace = state?.paces?.find(i => pace === i.paceId)
      const activeType = state?.typesForWorkout?.find(i => type === i.name)

      if (activePace?.paceId) {
        obj.paceId = activePace.paceId
      } else if (pace && pace !== 'None') {
        obj.paceId = workout?.paceId
      }

      if (customType) {
        obj.workoutTypeName = type
        obj.workoutTypeId = null
      } else {
        if (activeType?.workoutTypeId) {
          obj.workoutTypeId = activeType.workoutTypeId
        } else if (type) {
          obj.workoutTypeId = type
        }
      }

      if (obj?.time) {
        delete obj?.distance
      } else {
        delete obj?.time
      }

      if (workout?.workoutId) {
        dispatch(editWorkout(athleteId, workout?.workoutId, obj)).then(res => {
          setIsloadingSave(false)
          if (res) {
            onChangeActiveWorkout()
            dispatch(getTypesWorkout())
            setCustomType()
          }
        })
      } else {
        obj = {
          ...obj,
          planId: state?.planCurrentAthlete?.data?.planId,
          date: workout?.date,
        }
        dispatch(createWorkout(athleteId, obj)).then(res => {
          setIsloadingSave(false)
          if (res) {
            onChangeActiveWorkout()
            dispatch(getTypesWorkout())
            setCustomType()
          }
        })
      }
    })
  }

  const onSubmitToLibrary = (
    form,
    workout,
    customType,
    setCustomType,
    options,
  ) => {
    form.validateFields((err, values) => {
      if (err) return null

      const { pace, type, distance, description, time } = values

      const name = values?.name?.trim()

      if (options?.name?.required && !name) {
        return options?.name?.fn?.()
      } else {
        form.setFields({
          name: {
            value: name,
          },
        })
      }

      setIsloadingLibrary(true)

      const activePace = state?.paces?.find(i => pace === i.paceId)
      const activeType = state?.typesForWorkout?.find(i => type === i.name)

      const obj = { name, description, paceId: pace }

      if (distance !== undefined) {
        obj.distance = distance
      }
      if (time !== undefined) {
        obj.time = moment(time).format('HH:mm')
      }

      if (activePace?.paceId) {
        obj.paceId = activePace.paceId
      } else if (pace && pace !== 'None') {
        obj.paceId = workout?.paceId
      }

      if (customType) {
        obj.workoutTypeName = type
        obj.workoutTypeId = null
      } else {
        if (activeType?.workoutTypeId) {
          obj.workoutTypeId = activeType.workoutTypeId
        } else if (type) {
          obj.workoutTypeId = type
        }
      }

      dispatch(libraryActions.createWorkout(obj)).then(res => {
        setIsloadingLibrary(false)
        if (res) {
          showSuccess('Added!')
          dispatch(getTypesWorkout())
          dispatch(libraryActions.getAllWorkouts())
          setCustomType()
        }
      })
    })
  }

  const onDelete = workoutId => {
    setIsloadingDel(true)
    dispatch(delWorkout(workoutId, athleteId)).then(() => {
      setIsloadingDel(false)
      onChangeActiveWorkout()
    })
  }

  const setValue = e => {
    const val = e.target.value

    if (val.split(' ').length < 250) {
      setValueInput(val)
    } else {
      setValueInput(
        val
          .split(' ')
          .slice(0, 250)
          .join(' '),
      )
    }
  }

  const setInput = () => setIsInput(!isInput)

  const update = e => {
    dispatch(
      updateWeek(state.profile.userId, week.weekId, {
        description: e.target.value,
      }),
    )
    setInput()
  }

  const delWeek = () =>
    dispatch(
      deleteWeek(state?.planCurrentAthlete?.data?.planId, week?.weekId),
    ).then(getPlan)

  const copyWeeks = () => {
    dispatch(copyWeek(state?.planCurrentAthlete.data.planId, week.weekId)).then(
      res => {
        getPlan().then(() => {
          if (res) {
            notification.success({ message: 'Week copied successfully' })
            const doc = document.getElementById('contentContainer')

            doc.scrollTo(0, doc.scrollHeight)

            const queryAttr = 'data-rbd-draggable-id'
            const domQuery = `[${queryAttr}='${res?.week?.numberOfWeek}']`
            const elem = document.querySelector(domQuery)

            elem.id = 'wrapperPhasesAnimation'
          }
        })
      },
    )
  }

  const onChangeActiveWorkout = workout => setActiveWorkout(workout)

  const attr = {
    onCancel: () => onChangeActiveWorkout(),
    workout: activeWorkout,
    onSubmit,
    onDelete,
    onSubmitToLibrary,
    isloadingSave,
    isloadingDel,
    isloadingLibrary,
  }

  const wrapperHeader = provided => (
    <div className={css.header}>
      <div className={css.wrapperTitle}>
        <span className={css.titlePhases}>phase {phases.phaseNumber}</span>
        <div className={css.wrapperTitleWeek}>
          <span className={css.titleWeek}>
            {provided && week.numberOfWeek > currentWeeks && (
              <div {...provided.dragHandleProps}>
                <ImgDrag />
              </div>
            )}

            <div>{moment(workout.date).format('MMM, DD')}</div>
          </span>
          <div className={css.line} />
          <div className={css.wrapperLastIcon}>
            <span className={css.titleWeek}>
              Week {week.numberOfWeek} of {numberWeek}
            </span>
            {week.numberOfWeek > currentWeeks && (
              <Popconfirm
                title='Are you sure you want to delete this week?'
                onConfirm={delWeek}
                okText='Yes'
                cancelText='No'
              >
                <Icon type='trash' size='medium' />
              </Popconfirm>
            )}
            <CopyOutlined
              onClick={copyWeeks}
              size='medium'
              className={css.iconEdit}
            />
          </div>
        </div>
        <span className={css.titleCoachNote}>coach note</span>
        {isInput ? (
          <TextArea
            ref={inputRef}
            placeholder='Your Note...'
            value={valueInput}
            className={css.input}
            onPressEnter={update}
            onBlur={update}
            onChange={setValue}
            autoSize
          />
        ) : (
          <div
            className={
              week.isPublished ? css.descriptionPublished : css.description
            }
            onClick={setInput}
          >
            {valueInput.length ? valueInput : 'Your Note...'}
          </div>
        )}
      </div>

      {activeWorkout &&
        (activeWorkout?.workoutId ? (
          moment(activeWorkout.date).format('YYYY-MM-DD') >=
            moment(Date.now()).format('YYYY-MM-DD') &&
          activeWorkout?.status?.statusId === 1 ? (
            <ModalFormWorkout {...attr} />
            ) : (
              <ModalDetailWorkout {...attr} />
            )
        ) : (
          <ModalFormWorkout {...attr} />
        ))}
    </div>
  )

  const wrapperWeeks = () => (
    <div className={css.wrapperWorkouts}>
      {week.workouts.map(i =>
        i?.workoutId ? (
          <WorkoutCard
            key={i.date}
            workout={i}
            setWorkout={() => onChangeActiveWorkout(i)}
          />
        ) : (
          <WorkoutCard
            key={i.date}
            workout={i}
            isEmpty
            setWorkout={() => onChangeActiveWorkout(i)}
          />
        ),
      )}
    </div>
  )

  return week.numberOfWeek > currentWeeks ? (
    <Draggable draggableId={week.numberOfWeek.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={css.wrapperPhases}
        >
          {wrapperHeader(provided)}
          {wrapperWeeks()}
        </div>
      )}
    </Draggable>
  ) : (
    <div className={css.wrapperPhases}>
      {wrapperHeader()}
      {wrapperWeeks()}
    </div>
  )
}

export default memo(ListWeeks)
