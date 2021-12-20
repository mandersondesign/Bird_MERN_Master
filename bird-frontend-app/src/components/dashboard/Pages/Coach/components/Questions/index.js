import React, { useState, useEffect } from 'react'
import { Icon } from 'components/CustomIcon'
import { Form, Input } from 'antd'
import css from './index.less'

// TODO: Update antd. use Form.List
const { Item } = Form
const FormInput = props => <Input className={css.SpecInput} {...props} />
const getId = () => (Math.random() + '').replace('.', '')
const Questions = Form.create()(({ onSubmit = () => {}, form, storeQuestions = [] }) => {
  const defaultQuestions = (storeQuestions?.length ? storeQuestions : ['']).reduce((acc, value) => {
    acc[getId()] = value
    return acc
  }, {})

  const [questions, setQuestions] = useState(defaultQuestions)

  useEffect(() => {
    onSubmit(Object.values(questions).filter(Boolean))
  }, [JSON.stringify(questions)])

  const addSpec = () => {
    setQuestions({ ...questions, [getId()]: '' })
  }

  const keys = Object.keys(questions)

  const deleteSpec = (obj, key) => {
    if (Object.keys(obj).length > 1) {
      delete obj[key]
    } else {
      form.resetFields()
      obj[key] = ''
    }
    setQuestions(obj)
  }

  const saveToStore = e => {
    e.preventDefault()
    form.validateFields((errors, values) => {
      if (errors) {
        return errors
      }
      setQuestions({ ...questions, ...values })
    })
  }
  const formProps = { placeholder: 'Type your question here', onBlur: saveToStore, onPressEnter: saveToStore }

  return (
    <div className={css.wrapperOnboarding}>
      {keys.map(key => (
        <div key={key} className={css.inputSpecial}>
          <Item className={css.wrapperOnboarding}>
            {form.getFieldDecorator(key, {
              rules: [
                { transform: value => value.trim() },
                {
                  required: true,
                  message: 'Questions can not be empty',
                },
              ],
              normalize: value => value.length < 100 ? value : value.substr(0, 100),
              initialValue: questions[key],
            })(FormInput(formProps))}
          </Item>
          <span className={css.deleteIcon}>
            <Icon className={css.deleteBtn} type='trash' size='small' onClick={() => deleteSpec({ ...questions }, key)} />
          </span>
        </div>
      ))}
      {keys?.length < 3 && (
        <div className={css.addBtn} onClick={addSpec}>
          <img alt='add' src='/img/plus.svg' className={css.plus} />
          <div className={css.text}>ADD QUESTION</div>
        </div>
      )}
    </div>
  )
})

export default Questions
