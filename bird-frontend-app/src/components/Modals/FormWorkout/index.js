import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Form, Input, InputNumber, Select, Button, Switch, Radio, TimePicker } from 'antd'
import { ListIcons, HeaderWorkout, WorkoutAutoComplete } from 'components'
import { parseMovingTime } from 'helpers/transformers'
import moment from 'moment'
import c from 'classnames'
import css from './index.less'

const { Item } = Form
const { Option } = Select

const FormInput = props => <Input className={css.input} {...props} />
const FormInputNumber = props => <InputNumber className={css.input} {...props} />
const FormInputTextArea = props => <Input.TextArea className={css.input} autoSize={{ minRows: 5, maxRows: 5 }} {...props} />
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

const getRules = message => [{ required: true, message }]

const FormWorkout = ({ form, workout, onCancel, onSubmit, onSubmitToLibrary, isloadingSave, isloadingDel, isloadingLibrary, onDelete }) => {
  const [isLibrary, setIsLibrary] = useState(false)
  const [customType, setCustomType] = useState(false)
  const [workoutLibrary, setWorkoutLibrary] = useState()
  const [switchType, setSwitchType] = useState('distance')
  const { typesForWorkout, pacesWorkout, paces } = useSelector(state => state.athlets)
  const customTypeRef = useRef()

  useEffect(() => {
    const field = !!workout?.time || !!workoutLibrary?.time ? 'time' : 'distance'
    setSwitchType(field)
  }, [workoutLibrary, workout])

  useEffect(() => {
    onChangePace(workout)
  }, [])

  useEffect(() => {
    const type = form.getFieldValue('type')

    if (type === 'Create New Type') {
      setCustomType(true)
      form.setFieldsValue({ type: '' })
    }
  }, [form.getFieldValue('type')])

  useEffect(() => {
    if (customType) {
      customTypeRef.current.focus()
    }
  }, [customType, customTypeRef])

  const onChangeIsLiibrary = () => setIsLibrary(!isLibrary)

  const onChangeWorkout = item => {
    form.setFieldsValue({ name: item?.name || '' })
    form.setFieldsValue({ distance: item?.distance ?? '' })
    form.setFieldsValue({ description: item?.description || '' })
    form.setFieldsValue({ type: item?.workoutType?.name || '' })
    form.setFieldsValue({ pace: onChangePace(item) })
    setWorkoutLibrary(item)
  }

  const isNewWorkout = workout?.status?.statusId === 1

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
    const time = workout?.time || workoutLibrary?.time
    return time
      ? moment(parseMovingTime(time), 'hh:mm')
      : null
  }
  const startTime = moment('00:00', 'hh:mm')
  const renderSwitch = {
    distance: () => (
      <Item className={css.item}>
        {form.getFieldDecorator('distance', {
          initialValue: workout?.distance ?? 0,
          rules: [{ required: switchType === 'distance', message: 'Distance can not be empty' }],
        })(FormInputNumber({ min: 0 }))}
      </Item>
    ),
    time: () => (
      <Item className={css.item}>
        {form.getFieldDecorator('time', {
          initialValue: initialTime(),
          rules: [{ required: switchType === 'time', message: 'Time can not be empty' }],
        })(<TimePicker showTime placeholder='hh:mm' format='HH:mm' allowClear={false} suffixIcon={<span />} defaultOpenValue={startTime} />)}
      </Item>
    ),
  }

  const handlerSubmit = e => {
    e.preventDefault()
    onSubmit(form, workoutLibrary ? { ...workout, ...workoutLibrary } : workout, customType, () => setCustomType(false))
  }

  const handlerSubmitLibrary = e => {
    e.preventDefault()
    const options = isNewWorkout && {
      name: {
        required: true,
        fn: () => form.setFields({
          name: {
            value: '',
            errors: [new Error('Name can not be empty')],
          },
        }),
      },
    }
    onSubmitToLibrary(form, workoutLibrary ? { ...workout, ...workoutLibrary } : workout, customType, () => setCustomType(false), options)
  }

  const handlerDelete = e => {
    e.preventDefault()
    onDelete(workout?.workoutId)
  }

  const onChangePace = workoutPace => {
    const valuePace = pacesWorkout.find(i => i.paceId === workoutPace.paceId)
    const valuePaces = paces.find(i => i.paceId === workoutPace.paceId)

    const initialValuePace = valuePace
      ? valuePace?.pace?.name + ` (${valuePace?.value === 'Invalid date' ? '00:00' : valuePace?.value})`
      : valuePaces
        ? valuePaces?.name + ' (00:00)'
        : null

    return initialValuePace
  }

  const initialValuePace = onChangePace(workout)

  return (
    <Modal visible onCancel={onCancel} className={css.wrapperModalNewWorkout} footer={null}>
      <div className={css.header}>
        <HeaderWorkout date={workout.date} />
        {workout?.workoutId && <ListIcons workout={workout} showLike={moment(workout.date).format('YYYY-MM-DD') < moment(Date.now()).format('YYYY-MM-DD')} />}
      </div>

      <Form onSubmit={handlerSubmit}>
        <div className={css.wrapperSwitch}>
          <div className={css.text}>Choose an existing workout from the workout library</div>
          <Switch checked={isLibrary} className={c({ [css.switchChecked]: isLibrary })} onChange={onChangeIsLiibrary} />
        </div>

        <Item hidden={!isLibrary}>
          {form.getFieldDecorator('workout')(WorkoutAutoComplete(onChangeWorkout))}
        </Item>

        <div className={css.wrapperNewWorkoutBody}>
          <div className={css.block}>
            {card('name',
              <Item className={css.item}>
                {form.getFieldDecorator('name', { initialValue: workout?.name || '' })(FormInput())}
              </Item>,
            )}

            {card('pace',
              <Item className={css.item}>
                {form.getFieldDecorator('pace', { initialValue: initialValuePace })(FormSelect({ dataSource: paces, pacesWorkout, showPaces: true, showNone: true }))}
              </Item>,
            )}
          </div>

          <div className={css.block}>
            {customType ? (
              card(
                'type',
                <Item>
                  {form.getFieldDecorator('type', { initialValue: '', rules: getRules('Type can not be empty') })(FormInput({ ref: customTypeRef }))}
                </Item>,
              )
            ) : (
              card(
                'type',
                <Item className={css.item}>
                  {form.getFieldDecorator('type', { initialValue: workout?.workoutType?.name || '', rules: getRules('Type can not be empty') })(FormSelect({ dataSource: typesForWorkout }))}
                </Item>,
              )
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
            {card('workout description',
              <Item className={css.item}>
                {form.getFieldDecorator('description', { initialValue: workout?.description || '' })(FormInputTextArea())}
              </Item>,
            )}
          </div>
        </div>

        <div className={c(css.wrapperBtn, { [css.wrapperBtnTwo]: !!workout?.workoutId })}>
          {!!workout?.workoutId && (
            <Button
              className={c(css.submitButton, css.submitButtonDelete)}
              loading={isloadingDel}
              onClick={handlerDelete}
            >
              delete
            </Button>
          )}
          <div>
            {!!workoutLibrary || isNewWorkout && (
              <Button
                className={c(css.submitButton, css.submitButtonLibrary)}
                loading={isloadingLibrary}
                onClick={handlerSubmitLibrary}
              >
                add to library
              </Button>
            )}
            <Button
              htmlType='submit'
              className={c(css.submitButton, css.submitButtonWidth)}
              loading={isloadingSave}
            >
              save
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

const WrappedFrom = Form.create()(FormWorkout)
const ModalNewWorkout = props => <WrappedFrom {...props} />

export default ModalNewWorkout
