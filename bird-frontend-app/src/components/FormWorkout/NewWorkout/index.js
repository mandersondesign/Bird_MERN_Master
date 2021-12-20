import React, { useRef, useEffect, useState } from 'react'
import { Input } from 'components'
import { Form, Select, InputNumber, notification, Button, Radio, TimePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { createWorkout, editWorkout } from 'modules/workouts/workouts-actions'
import { getPaces, getTypesWorkout } from 'modules/athlets/athlets-actions'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import css from './index.less'
import c from 'classnames'
import ReactTextFormat from 'react-text-format'
import { parseMovingTime } from 'helpers/transformers'
import moment from 'moment'

const { Option } = Select
const { Item } = Form

const FormInput = props => <Input className={css.input} {...props} />
const FormInputTextArea = props => <Input.TextArea className={css.input} autoSize={{ minRows: 5, maxRows: 5 }} {...props} />
const FormInputNumber = props => <InputNumber className={css.input} {...props} />
const FormSelect = props => {
  const { placeholder = '', dataSource = [], showNone = false } = props
  let currentDataSource = dataSource

  if (dataSource[0]?.workoutTypeId) {
    currentDataSource = [{ workoutTypeId: null, name: 'Create New Type' }, ...dataSource]
  }

  return (
    <Select className={css.select} placeholder={placeholder}>
      {showNone && <Option value={null}>None</Option>}
      {currentDataSource.map((i, index) => (
        <Option key={index} value={i?.workoutTypeId || i?.paceId || i?.name}>
          {i?.name || (`${i?.pace?.name} (${i?.value})`)}
        </Option>
      ))}
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
        <ReactTextFormat
          linkTarget='_blank'
          allowedFormats={['URL']}
        >
          {text}
        </ReactTextFormat>
      </div>
    </Item>
  </div>
)

const FormWorkout = ({
  form,
  workout = {},
  setEdit,
  updateVisible,
  onSubmit,
  popupForLibrary,
  popupForLibraryEdit,
  workoutFromLibrary = {},
  resetSort,
}) => {
  const [descriptionForLinks, setFlagDescriptionForLinks] = useState(true)
  const [customType, setCustomType] = useState(false)
  const [requiredName, setRequiredName] = useState(false)
  const [description = workout?.description || workoutFromLibrary?.description, setDescription] = useState()
  const fieldType = workout?.time || workoutFromLibrary?.time ? 'time' : 'distance'
  const [switchType, setSwitchType] = useState(fieldType)
  const { typesForWorkout, paces } = useSelector(state => state.athlets)
  const customInputRef = useRef()
  const customDescriptionRef = useRef()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const url = pathname?.split('/')[3]
  const type = typesForWorkout.find(i => workout?.workoutTypeId === i?.workoutTypeId)
  const pace = paces.find(i => workout.paceId === i.paceId)

  const handlerFlagDesc = () => {
    if (!descriptionForLinks) {
      setFlagDescriptionForLinks(true)
      form.setFieldsValue({ description: form.getFieldValue('description') })
    }
  }

  useEffect(() => {
    setDescription(workout?.description || workoutFromLibrary?.description)
  }, [workout?.description, workoutFromLibrary?.description])

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

    const el = document.getElementById('name')

    if (type === 'Create New Type') {
      setCustomType(true)
    }

    if (name !== undefined) {
      if (url === 'plan' || url === 'plan_template') {
        name?.length && setRequiredName(false)
      } else {
        setRequiredName(!name?.trim()?.length)
      }
    }

    el.placeholder = ''
  }, [form.getFieldValue('type'), form.getFieldValue('name')])

  useEffect(() => {
    dispatch(getTypesWorkout())
    dispatch(getPaces())
  }, [])

  const getRules = message => [{ required: true, message }]

  const onCheckCustomInput = (rule, value, callback) => {
    if (!value.length) {
      callback('Type can not be empty')
    } else if (form.getFieldValue('type') !== 'Create New Type') {
      callback()
    }
  }

  const resetForm = () => {
    updateVisible()
    form.resetFields()
  }

  const onSwitchType = event => setSwitchType(event.target.value)
  const radioOptions = [
    {
      label: 'distance',
      value: 'distance',
    },
    {
      label: 'time',
      value: 'time',
    },
  ]
  const initialTime = () => {
    const time = workout?.time || workoutFromLibrary?.time
    return time
      ? moment(parseMovingTime(time), 'hh:mm')
      : null
  }
  const startTime = moment('00:00', 'hh:mm')
  const renderSwitch = {
    distance: () => (
      <Item>
        {form.getFieldDecorator('distance', {
          initialValue: workout?.distance || workoutFromLibrary?.distance || 0,
          rules: [{ required: switchType === 'distance', message: 'Distance can not be empty' }],
        })(FormInputNumber({ min: 0 }))}
      </Item>
    ),
    time: () => (
      <Item>
        {form.getFieldDecorator('time', {
          initialValue: initialTime(),
          rules: [{ required: switchType === 'time', message: 'Time can not be empty' }],
        })(<TimePicker showTime placeholder='hh:mm' format='HH:mm' allowClear={false} suffixIcon={<span />} defaultOpenValue={startTime} />)}
      </Item>
    ),
  }

  const saveToWorkoutLibraryBtn = form => {
    form.validateFields((err, values) => {
      const { distance, name, pace, type, time } = values
      if (!name?.trim()?.length) {
        setRequiredName(true)
        return null
      }

      const customTypeValue = values?.customType?.trim()

      if (customType && !customTypeValue?.length) {
        form.setFields({
          customType: {
            value: '',
            errors: [new Error('Type can not be empty')],
          },
        })
        return null
      }

      if (err) return null

      const { workoutLibraryId } = workoutFromLibrary

      const paceNew = paces.find(i => pace === i.name)
      const typeNew = typesForWorkout.find(i => type === i.name)

      const obj = { name, description, paceId: pace }

      if (distance !== undefined) {
        obj.distance = distance
      }
      if (time !== undefined) {
        obj.time = moment(time).format('HH:mm')
      }

      if (paceNew) {
        obj.paceId = paceNew.paceId
      }

      if (typeNew) {
        obj.workoutTypeId = typeNew.workoutTypeId
      } else if (type) {
        obj.workoutTypeId = type
      } else {
        obj.workoutTypeId = null
        obj.workoutTypeName = customTypeValue
      }
      if (workoutLibraryId) {
        dispatch(editWorkout(workoutLibraryId, obj)).then(res => {
          if (res && popupForLibrary) {
            resetForm()
          }
          setCustomType(false)
        })
      } else {
        dispatch(createWorkout(obj)).then(res => {
          if (res) {
            setDescription('')
            resetSort()
            setCustomType(false)
            dispatch(getAthletesMeta())
            notification.success({ message: 'Created!' })
            popupForLibrary && resetForm()
          }
        })
      }
    })
  }

  return (
    <Form onSubmit={e => {
      setRequiredName(false)
      onSubmit(e, form, updateVisible, customType, setCustomType)
    }}
    >
      <div className={css.wrapperNewWorkout}>
        <div className={css.wrapperNewWorkoutBody}>
          <div onClick={handlerFlagDesc} className={css.block}>
            {card('name',
              <Item validateStatus={requiredName ? 'error' : ''} help={requiredName ? 'Name can not be empty' : ''}>
                {form.getFieldDecorator('name', {
                  initialValue: workout?.name?.length ? workout?.name : workoutFromLibrary?.name?.length ? workoutFromLibrary?.name : undefined,
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
                  initialValue: type?.name || workoutFromLibrary?.workoutType?.name, rules: getRules('Type can not be empty'),
                })(FormSelect({ dataSource: typesForWorkout }))}
              </Item>,
            )}
          </div>

          <div onClick={handlerFlagDesc} className={css.block}>
            {card('pace',
              <Item>
                {form.getFieldDecorator('pace', {
                  initialValue: pace?.name || workoutFromLibrary?.pace?.name || null,
                })(FormSelect({ dataSource: paces, showNone: true }))}
              </Item>,
            )}
            <div className={css.wrapperType}>
              <Radio.Group
                className={css.radioGroup}
                defaultValue={switchType}
                onChange={onSwitchType}
                options={radioOptions}
                value={switchType}
              />
              <Item>{renderSwitch[switchType]()}</Item>
            </div>
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

        <div onClick={handlerFlagDesc} className={css.buttons}>
          <Button htmlType='button' onClick={() => saveToWorkoutLibraryBtn(form)} className={c(css.addBtn, css.titleBtn)}>
            {popupForLibrary
              ? popupForLibraryEdit ? 'Save' : 'Add new'
              : 'Save to workout library'}
          </Button>

          {!popupForLibrary && <Button htmlType='submit' className={css.addBtn}>{workout?.workoutTemplateId ? 'Save' : 'Add'}</Button>}
        </div>
      </div>
    </Form>
  )
}

const WrappedFrom = Form.create()(FormWorkout)

const NewWorkout = props => <WrappedFrom {...props} />

export default NewWorkout
