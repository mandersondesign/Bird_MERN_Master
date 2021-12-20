import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWorkouts } from 'modules/workouts/workouts-actions'
import { createWorkout, editWorkout } from 'modules/athlets/athlets-actions'
import css from './index.less'
import { Form, Select, InputNumber, AutoComplete, Button, notification } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Input } from 'components'
import c from 'classnames'
import ReactTextFormat from 'react-text-format'

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

const FormAutoCompleteSelect = setWorkout => {
  const [options, setOptions] = useState([])
  const [isArrow, setIsArrow] = useState(false)
  const { workouts = [] } = useSelector(state => state.workouts)
  const dispatch = useDispatch()

  const onChangeIsArrow = () => setIsArrow(!isArrow)

  const onSearch = value => {
    if (value?.length >= 3) {
      dispatch(getAllWorkouts())
    }

    if (!value?.length) {
      dispatch(getAllWorkouts())
    }
  }

  useEffect(() => {
    setOptions(workouts)
  }, [workouts])

  return (
    <div className={css.wrapperAutoComplete}>
      <DownOutlined className={c(css.iconArrow, { [css.iconArrowActive]: isArrow })} />
      <AutoComplete onDropdownVisibleChange={onChangeIsArrow} dataSource={options} onSearch={onSearch}>
        {options.map(workout => <Option value={workout?.workoutLibraryId?.toString()} onClick={() => setWorkout(workout)} key={workout.workoutLibraryId}>{workout.name}</Option>)}
      </AutoComplete>
    </div>
  )
}

const card = (label, value, descriptionForLinks = false) => (
  <div className={c(css.wrapperType, { [css.hideDescription]: descriptionForLinks })}>
    <span className={css.title}>{label}</span>
    {value}
  </div>
)

const cardForDescription = (label, text, setFlagDescriptionForLinks, form) => (
  <div className={c(css.wrapperType)}>
    <span className={css.title}>{label}</span>
    <Item>
      <div
        onClick={() => {
          form.setFieldsValue({ description: text })
          setFlagDescriptionForLinks(false)
        }}
        className={css.descriptionLink}
      >
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

const FromLibraryForm = ({ form, workout = {}, setEdit, updateVisible }) => {
  const [descriptionForLinks, setFlagDescriptionForLinks] = useState(true)
  const [loading, setLoading] = useState(false)
  const [choosenWorkout, setChoosenWorkout] = useState({})
  const [customType, setCustomType] = useState(false)
  const [description = choosenWorkout?.description, setDescription] = useState()
  const { planCurrentAthlete: { data }, typesForWorkout, paces } = useSelector(state => state.athlets)
  const customInputRef = useRef()
  const customDescriptionRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWorkouts())
  }, [])

  useEffect(() => {
    if (choosenWorkout?.name) {
      form.setFieldsValue({ workout: choosenWorkout?.name })
    }
  }, [choosenWorkout])

  useEffect(() => {
    if (form.getFieldValue('type') === 'Create New Type') {
      setCustomType(true)
    }
  }, [form.getFieldValue('type')])

  const handlerFlagDesc = () => {
    if (!descriptionForLinks) {
      setFlagDescriptionForLinks(true)
      form.setFieldsValue({ description: form.getFieldValue('description') })
    }
  }

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

  const updateForm = res => {
    if (res) {
      workout?.workoutId ? setEdit() : updateVisible()
      setCustomType(false)
    }

    setLoading(false)
  }

  const saveResults = e => {
    e.preventDefault()

    if (!choosenWorkout?.workoutLibraryId) {
      notification.error({ message: 'This workout does not exist in your library' })
      return null
    }

    form.validateFields((err, values) => {
      if (err) return null
      setLoading(true)

      const { pace, type, customType, name, distance } = values
      const { planId, athleteId } = data
      const { workoutId, date } = workout

      const paceNew = paces.find(i => pace === i.name)
      const typeNew = typesForWorkout.find(i => type === i.name)

      let obj = { name: choosenWorkout?.name || name || values.workout, description, distance }

      obj.paceId = isNaN(pace) ? paceNew.paceId : pace

      if (customType) {
        obj.workoutTypeId = null
        obj.workoutTypeName = customType
      } else if (isNaN(type)) {
        obj.workoutTypeId = typeNew.workoutTypeId
      } else {
        obj.workoutTypeId = type
      }

      obj = { ...obj, planId, date }

      if (workoutId) {
        dispatch(editWorkout(athleteId, workoutId, obj)).then(res => updateForm(res))
      } else {
        dispatch(createWorkout(athleteId, obj)).then(res => updateForm(res))
      }
    })
  }

  const onCheckCustomInput = (rule, value, callback) => {
    if (!value.length) {
      callback('Type can not be empty')
    } else if (form.getFieldValue('type') !== 'Create New Type') {
      callback()
    }
  }

  const resetForm = () => {
    form.resetFields()
    setChoosenWorkout()
    setCustomType(false)
  }

  const getRules = message => [{ required: true, message }]

  return (
    <Form onSubmit={e => saveResults(e, form, updateVisible, customType, setCustomType)}>
      <div className={css.wrapperNewWorkout}>
        <div className={css.wrapperNewWorkoutBody}>
          <div
            onClick={handlerFlagDesc}
            className={css.block}
          >
            {card('workout',
              <Item>
                {form.getFieldDecorator('workout', {
                  initialValue: '', rules: getRules('Workout can not be empty'),
                })(FormAutoCompleteSelect(setChoosenWorkout))}
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
                  initialValue: choosenWorkout?.workoutType?.name || '', rules: getRules('Type can not be empty'),
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
                {form.getFieldDecorator('pace', {
                  initialValue: choosenWorkout?.pace?.name || null,
                })(FormSelect({ dataSource: paces, showNone: true }))}
              </Item>,
            )}

            {card('distance',
              <Item>
                {form.getFieldDecorator('distance', {
                  initialValue: choosenWorkout?.distance !== undefined ? choosenWorkout?.distance : '', rules: getRules('Distance can not be empty'),
                })(FormInputNumber({ min: 0 }))}
              </Item>,
            )}
          </div>

          <div className={c(css.block, css.blockLast)}>
            {descriptionForLinks && cardForDescription('workout description', description, setFlagDescriptionForLinks, form)}
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
          <div onClick={resetForm} className={css.clearBtn}>Clear</div>
          <Button htmlType='submit' className={css.addBtn} loading={loading}>Add workout</Button>
        </div>
      </div>
    </Form>
  )
}

const WrappedFrom = Form.create()(FromLibraryForm)
const FromLibrary = props => <WrappedFrom {...props} />

export default FromLibrary
