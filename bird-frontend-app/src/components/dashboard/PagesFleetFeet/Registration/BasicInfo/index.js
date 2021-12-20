import React, { useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registration, login } from 'modules/feet/feet-actions'
import { Form, Radio, Skeleton, Checkbox } from 'antd'
import { Input } from 'components'
import { MainTitle, Button } from '../../components'
import YourOrder from '../YourOrder'
import css from './index.less'

const { Item } = Form

const FormInput = props => <Input className={css.input} {...props} />
const FormInputPassword = props => <Input.Password className={css.input} {...props} autoComplete='new-password' />
const RadioGroup = ({ options = [], hasOther, title, onChangeOther, valueOther }) => (
  <Radio.Group className={css.group}>
    {options.map(i => <Radio key={i} value={i} className={css.radio}>{i}</Radio>)}
    {hasOther && (
      <div className={css.wrapperOtherRadio}>
        <Radio value='Other' className={css.radio}>Other:</Radio>
        <Input value={valueOther[title]} className={css.input} onChange={e => onChangeOther(title, e)} />
      </div>
    )}
  </Radio.Group>
)
const CheckBoxGroup = ({ options = [] }) => (
  <Checkbox.Group className={css.group}>
    {options.map(i => <Checkbox key={i} value={i} className={css.checkbox}>{i}</Checkbox>)}
  </Checkbox.Group>
)

const Question = ({ options, surveyQuestionId, title = '', form, hasOther, onChangeOther, valueOther, type, index }) => {
  const label = `${index + 1}. ${title} *`
  const inputTypes = {
    checkbox: CheckBoxGroup,
    radio: RadioGroup,
  }
  const InputType = inputTypes[type] || RadioGroup
  const message = type === 'checkbox' ? 'Choose at least one' : 'This question is required'
  return (
    <Item name={title} label={label} className={css.itemRadio}>
      {form.getFieldDecorator(`${surveyQuestionId}`, { rules: [{ required: true, message }] })(InputType({ options, hasOther, title, onChangeOther, valueOther }))}
    </Item>
  )
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const BasicInfo = ({ form }) => {
  const [loading, setLoading] = useState(false)
  const [valueOther, setValueOther] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const path = pathname?.split('/')
  const id = path[2]
  const page = path[3]
  const { questions = [] } = useSelector(state => state.feet)

  const onChangeOther = (title, e) => {
    if (e.target.value?.split(/\s+/).length <= 250) {
      setValueOther({ ...valueOther, [title]: e.target.value })
    }
  }

  const goNextPage = res => {
    if (res) history.push(`/event/${id}/release-form`)
    setLoading(false)
  }

  const goNext = () => {
    form.validateFields((err, values) => {
      if (err) return
      setLoading(true)

      const survey = questions?.map(i => {
        let answer = values[i.surveyQuestionId] === 'Other' ? valueOther[i.title] || '' : values[i.surveyQuestionId]
        if (Array.isArray(answer)) {
          answer = answer.join(';')
        }
        return {
          surveyQuestionId: i.surveyQuestionId,
          answer,
        }
      })

      let data = { email: values.Email, password: values.Password, survey }

      if (page === 'sign-up') {
        data = {
          ...data,
          firstName: values['First Name'],
          lastName: values['Last Name'],
          phone: values.Phone,
          birthDate: values['Date of birth'],
          eventAlias: id,
        }

        dispatch(registration(data)).then(res => goNextPage(res))
      } else {
        dispatch(login({ ...data, platform: 'fleetfeet' })).then(res => goNextPage(res))
      }
    })
  }

  const validator = (rule, value, callback) => {
    if (!value) {
      callback(`${rule?.field} can not be empty`)
      return
    }

    if (value.length) {
      if (rule?.field === 'Email' && !value.includes('@')) {
        callback('Email format is not valid')
      } else if (rule?.field === 'Password' && value?.length < 6) {
        callback('Password can not be less than 6 characters')
      }

      callback()
    } else {
      callback(`${rule?.field} can not be empty`)
    }
  }

  const objForm = {
    'sign-up': () => (
      <>
        <Item label='First Name *' className={css.firstItem}>
          {form.getFieldDecorator('First Name', { rules: [{ validator }] })(FormInput())}
        </Item>

        <Item label='Last Name *'>
          {form.getFieldDecorator('Last Name', { rules: [{ validator }] })(FormInput())}
        </Item>

        <Item label='Phone *'>
          {form.getFieldDecorator('Phone', { rules: [{ validator }] })(FormInput({ maskphone: '+1-999-999-9999' }))}
        </Item>

        <Item label='Email *'>
          {form.getFieldDecorator('Email', { validateTrigger: 'onBlur', rules: [{ type: 'email', validator }] })(FormInput())}
        </Item>

        <Item label='Password *'>
          {form.getFieldDecorator('Password', { validateTrigger: 'onBlur', rules: [{ validator }] })(FormInputPassword())}
        </Item>

        <Item label='Date of birth *'>
          {form.getFieldDecorator('Date of birth', { rules: [{ validator }] })(FormInput({ mask: 'date' }))}
        </Item>
      </>
    ),
    'sign-in': () => (
      <>
        <Item label='Email *' className={css.firstItem}>
          {form.getFieldDecorator('Email', { validateTrigger: 'onBlur', rules: [{ validator }] })(FormInput())}
        </Item>

        <Item label='Password *'>
          {form.getFieldDecorator('Password', { validateTrigger: 'onBlur', rules: [{ validator }] })(FormInputPassword())}
        </Item>
      </>
    ),
  }

  const objTitle = {
    'sign-up': () => (
      <div className={css.textLogIn}>
        Already have a Bird account?
        <Link to={`/event/${id}/sign-in`} className={css.link}>Log in</Link>
      </div>
    ),
    'sign-in': () => (
      <div className={css.textLogIn}>
        Don`t have an account?
        <Link to={`/event/${id}/sign-up`} className={css.link}>Sign up</Link>
      </div>
    ),
  }

  return (
    <div className={css.mainFormWrapper}>
      <div className={css.flex}>
        <Form {...layout} className={css.left} name='nest-messages'>
          <div className={css.top}>
            {objTitle[page]()}

            <MainTitle title={page === 'sign-up' ? 'Basic Info' : 'Login Info'} />

            <div className={css.form}>
              {objForm[page]()}
            </div>
          </div>

          <div className={css.bottom}>
            <MainTitle title='About You' />

            {questions.length ? questions.map((i, index) => <Question {...{ ...i, index }} valueOther={valueOther} form={form} key={i.surveyQuestionId} onChangeOther={onChangeOther} />) : (
              <div>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            )}
          </div>
        </Form>

        <YourOrder />
      </div>

      <div className={css.actions}>
        <div className={css.line} />
        <Button text='continue to payment' type='black' onClick={goNext} loading={loading} />
      </div>
    </div>
  )
}

const WrappedFrom = Form.create()(BasicInfo)
const FormBasicInfo = props => <WrappedFrom {...props} />

export default FormBasicInfo
