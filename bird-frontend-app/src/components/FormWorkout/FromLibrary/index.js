import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWorkouts } from 'modules/workouts/workouts-actions'
import css from './index.less'
import { Form, Select, InputNumber, AutoComplete, Button, notification, TimePicker, Radio } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Input } from 'components'
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
      <AutoComplete onDropdownVisibleChange={onChangeIsArrow} dataSource={options} onSearch={onSearch} placeholder=''>
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

const FromLibraryForm = ({ form, onSubmit, updateVisible }) => {
  const [descriptionForLinks, setFlagDescriptionForLinks] = useState(true)
  const [customType, setCustomType] = useState(false)
  const [choosenWorkout, setChoosenWorkout] = useState({})
  const [description = choosenWorkout?.description, setDescription] = useState()
  const { typesForWorkout, paces } = useSelector(state => state.athlets)
  const [switchType, setSwitchType] = useState('distance')
  const customInputRef = useRef()
  const customDescriptionRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWorkouts())
  }, [])

  useEffect(() => {
    if (form.getFieldValue('type') === 'Create New Type') {
      setCustomType(true)
    }
  }, [form.getFieldValue('type')])

  useEffect(() => {
    if (choosenWorkout?.name) {
      form.setFieldsValue({ workout: choosenWorkout?.name })
    }
    setSwitchType(choosenWorkout?.time ? 'time' : 'distance')
  }, [choosenWorkout])

  const handlerFlagDesc = () => {
    if (!descriptionForLinks) {
      setFlagDescriptionForLinks(true)
    }
  }

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

  const onChangeDesc = e => {
    setDescription(e.target.value)
    form.setFieldsValue({ description: e.target.value })
  }

  const setWorkoutFromLibrary = item => {
    setChoosenWorkout(item)
    setDescription(item.description || '')
    form.setFieldsValue({ description: item.description || '' })
  }

  const getRules = message => [{ required: true, message }]

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
    return choosenWorkout?.time
      ? moment(parseMovingTime(choosenWorkout?.time), 'hh:mm')
      : null
  }
  const startTime = moment('00:00', 'hh:mm')
  const renderSwitch = {
    distance: () => (
      <Item>
        {form.getFieldDecorator('distance', {
          initialValue: choosenWorkout?.distance !== undefined ? choosenWorkout?.distance : 0,
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

  return (
    <Form onSubmit={e => {
      e.preventDefault()
      if (!choosenWorkout?.workoutLibraryId) {
        notification.error({ message: 'This workout does not exist in your library' })
        return null
      }
      onSubmit(e, form, updateVisible, customType, setCustomType, choosenWorkout)
    }}
    >
      <div className={css.wrapperNewWorkout}>
        <div className={css.wrapperNewWorkoutBody}>
          <div
            onClick={handlerFlagDesc}
            className={css.block}
          >
            {card('workout',
              <Item>
                {form.getFieldDecorator('workout', {
                  initialValue: '',
                })(FormAutoCompleteSelect(setWorkoutFromLibrary))}
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
            {descriptionForLinks && cardForDescription('workout description', description, setFlagDescriptionForLinks, form)}
            {card('workout description',
              <Item hidden={descriptionForLinks}>
                {form.getFieldDecorator('description', { initialValue: description })(FormInputTextArea({ ref: customDescriptionRef, onChange: onChangeDesc }))}
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
          <Button htmlType='submit' className={css.addBtn}>Add workout</Button>
        </div>
      </div>
    </Form>
  )
}

const WrappedFrom = Form.create()(FromLibraryForm)
const FromLibrary = props => <WrappedFrom {...props} />

export default FromLibrary
