import React, { useRef, useEffect, useState } from 'react'
import { Input } from 'components'
import { Form, Select, InputNumber, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { editWorkout, createWorkout } from 'modules/athlets/athlets-actions'
import * as libraryActions from 'modules/workouts/workouts-actions'
import { showSuccess } from 'utils'
import css from './index.less'
import c from 'classnames'
import ReactTextFormat from 'react-text-format'

const { Option } = Select
const { Item } = Form

const FormInput = props => <Input className={css.input} {...props} />
const FormInputTextArea = props => <Input.TextArea className={css.input} autoSize={{ minRows: 5, maxRows: 5 }} {...props} />
const FormInputNumber = props => <InputNumber className={css.input} {...props} />
const FormSelect = props => {
  const { placeholder = '', dataSource = [], pacesWorkout = [], showPaces = false, showNone = false } = props
  let currentDataSource = dataSource

  if (dataSource[0].workoutTypeId) {
    currentDataSource = [{ workoutTypeId: null, name: 'Create New Type' }, ...dataSource]
  }

  return (
    <Select className={css.select} placeholder={placeholder}>
      {showNone && <Option value={null}>None</Option>}
      {currentDataSource.map((i, index) => {
        const pace = pacesWorkout.find(j => j.paceId === i.paceId)
        const value = pace ? ` (${pace.value === 'Invalid date' ? '00:00' : pace.value})` : ' (00:00)'
        return (
          <Option key={index} value={i.workoutTypeId || i.paceId || i.name}>
            {i.name + (showPaces ? value : '')}
          </Option>
        )
      })}
    </Select>
  )
}

const card = (label, value, descriptionForLinks = false) => (
  <div className={c(css.wrapperType, { [css.hideDescription]: descriptionForLinks })}>
    <span className={css.title}>{label}</span>
    {value}
  </div>
)

const cardForDescription = (label, text, setFlagDescriptionForLinks) => (
  <div className={c(css.wrapperType)}>
    <span className={css.title}>{label}</span>
    <Item>
      <div onClick={() => setFlagDescriptionForLinks(false)} className={css.descriptionLink}>
        <ReactTextFormat linkTarget='_blank' allowedFormats={['URL']}>
          {text}
        </ReactTextFormat>
      </div>
    </Item>
  </div>
)

const FormWorkout = ({ form, workout = {}, setEdit, updateVisible }) => {
  const [descriptionForLinks, setFlagDescriptionForLinks] = useState(true)
  const [description = workout?.description, setDescription] = useState()
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [loadingNew, setLoadingNew] = useState(false)
  const [customType, setCustomType] = useState(false)
  const [requiredName, setRequiredName] = useState(false)
  const { planCurrentAthlete: { data }, typesForWorkout, pacesWorkout, paces } = useSelector(state => state.athlets)
  const customInputRef = useRef()
  const customDescriptionRef = useRef()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const url = pathname?.split('/')[3]

  const handlerFlagDesc = () => {
    if (!descriptionForLinks) {
      setFlagDescriptionForLinks(true)
      form.setFieldsValue({ description: form.getFieldValue('description') })
    }
  }

  useEffect(() => {
    setDescription(workout?.description)
  }, [workout?.description])

  useEffect(() => {
    form.setFieldsValue({ description: form.getFieldValue('description') })
    setDescription(form.getFieldValue('description'))
  }, [form.getFieldValue('description')])

  useEffect(() => {
    if (customType) {
      customInputRef.current.focus()
    }
  }, [customInputRef, customType])

  useEffect(() => {
    if (!descriptionForLinks) {
      customDescriptionRef.current.focus()
    }
  }, [customDescriptionRef, descriptionForLinks])

  useEffect(() => {
    const type = form.getFieldValue('type')
    const name = form.getFieldValue('name')

    if (type === 'Create New Type') {
      setCustomType(true)
    }

    if (name !== undefined) {
      if (url === 'plan') {
        name?.length && setRequiredName(false)
      } else {
        setRequiredName(!name?.length)
      }
    }
  }, [form.getFieldValue('type'), form.getFieldValue('name')])

  const onCheckCustomInput = (rule, value, callback) => {
    if (!value.length) {
      callback('Type can not be empty')
    } else if (form.getFieldValue('type') !== 'Create New Type') {
      callback()
    }
  }

  const getRules = message => [{ required: true, message }]

  const saveToWorkoutLibraryBtn = () => {
    form.validateFields((err, values) => {
      const { customType, distance, name, pace, type } = values

      if (!name) {
        setRequiredName(true)
        return null
      }
      if (err) return null

      setLoadingLibrary(true)

      const paceNew = paces.find(i => pace === i.name)
      const typeNew = typesForWorkout.find(i => type === i.name)

      const obj = { name, description, distance, paceId: pace }

      if (paceNew) {
        obj.paceId = paceNew.paceId
      }

      if (typeNew) {
        obj.workoutTypeId = typeNew.workoutTypeId
      } else if (type) {
        obj.workoutTypeId = type
      } else {
        obj.workoutTypeId = null
        obj.workoutTypeName = customType
      }

      dispatch(libraryActions.createWorkout(obj)).then(res => {
        if (res) {
          showSuccess('Added!')
          setRequiredName(false)
        }
        setLoadingLibrary(false)
      })
    })
  }

  const saveResults = e => {
    e.preventDefault()
    setRequiredName(false)

    form.validateFields((err, values) => {
      if (err) return null
      setLoadingNew(true)

      const { pace, type, name, description, distance, customType } = values
      const { athleteId, planId } = data
      const { paceId, workoutId, date } = workout

      const activePace = paces.find(i => pace === i.paceId)
      const activeType = typesForWorkout.find(i => type === i.name)

      let obj = { name, description, distance }

      if (activePace?.paceId) {
        obj.paceId = activePace.paceId
      } else if (pace && pace !== 'None') {
        obj.paceId = paceId
      }

      if (activeType?.workoutTypeId) {
        obj.workoutTypeId = activeType.workoutTypeId
      } else if (type) {
        obj.workoutTypeId = type
      }

      if (workoutId) {
        if (customType) {
          obj.workoutTypeId = null
          obj.workoutTypeName = customType
        }

        dispatch(editWorkout(athleteId, workoutId, obj)).then(res => {
          if (res) {
            setEdit()
            setCustomType(false)
          }

          setLoadingNew(false)
        })
      } else {
        if (customType) {
          obj.workoutTypeId = null
          obj.workoutTypeName = customType
        }

        obj = { ...obj, planId, date }

        dispatch(createWorkout(athleteId, obj)).then(res => {
          if (res) {
            updateVisible()
            setCustomType(false)
          }

          setLoadingNew(false)
        })
      }
    })
  }

  const valuePace = pacesWorkout.find(i => i.paceId === workout.paceId)
  const valuePaces = paces.find(i => i.paceId === workout.paceId)

  const initialValue = valuePace
    ? valuePace?.pace?.name + ` (${valuePace?.value === 'Invalid date' ? '00:00' : valuePace?.value})`
    : valuePaces
      ? valuePaces?.name + ' (00:00)'
      : null

  return (
    <Form onSubmit={saveResults}>
      <div className={css.wrapperNewWorkout}>
        <div className={css.wrapperNewWorkoutBody}>
          <div
            onClick={handlerFlagDesc}
            className={css.block}
          >
            {card('name',
              <Item validateStatus={requiredName ? 'error' : ''} help={requiredName ? 'Name can not be empty' : ''}>
                {form.getFieldDecorator('name', {
                  initialValue: workout?.name?.length ? workout?.name : undefined,
                })(FormInput())}
              </Item>,
            )}

            {customType ? card('type',
              <Item>
                {form.getFieldDecorator('customType', {
                  initialValue: '', rules: [{ validator: onCheckCustomInput }],
                })(FormInput({ ref: customInputRef }))}
              </Item>,
            ) : card('type',
              <Item>
                {form.getFieldDecorator('type', {
                  initialValue: workout?.workoutType?.name, rules: getRules('Type can not be empty'),
                })(FormSelect({ dataSource: typesForWorkout }))}
              </Item>,
            )}
          </div>

          <div
            onClick={handlerFlagDesc}
            className={css.block}
          >
            {card('pace',
              <Item>
                {form.getFieldDecorator('pace', { initialValue })(FormSelect({ dataSource: paces, pacesWorkout, showPaces: true, showNone: true }))}
              </Item>,
            )}

            {card('distance',
              <Item>
                {form.getFieldDecorator('distance', {
                  initialValue: workout?.distance !== undefined ? workout?.distance : '', rules: getRules('Distance can not be empty'),
                })(FormInputNumber({ min: 0 }))}
              </Item>,
            )}
          </div>

          <div className={c(css.block, css.blockLast)}>
            {descriptionForLinks && cardForDescription('workout description', description, setFlagDescriptionForLinks)}
            {card('workout description',
              <Item hidden={descriptionForLinks}>
                {form.getFieldDecorator('description', { initialValue: description })(FormInputTextArea({ ref: customDescriptionRef }))}
              </Item>,
              descriptionForLinks,
            )}
          </div>
        </div>

        <div
          onClick={handlerFlagDesc}
          className={css.buttons}
        >
          <Button htmlType='button' onClick={saveToWorkoutLibraryBtn} className={c(css.addBtn, css.titleBtn)} loading={loadingLibrary}>
            Save to workout library
          </Button>
          <Button htmlType='submit' className={css.addBtn} loading={loadingNew}>
            {workout.workoutId ? 'Save' : 'Add'}
          </Button>
        </div>
      </div>
    </Form>
  )
}

const WrappedFrom = Form.create()(FormWorkout)

const NewWorkout = props => <WrappedFrom {...props} />

export default NewWorkout
