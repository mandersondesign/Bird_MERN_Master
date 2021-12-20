import React, { useState } from 'react'
import { Icon } from 'components/CustomIcon'
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd'
import css from '../index.less'

// TODO: Update antd. use Form.List
const { Item } = Form

const FormInput = props => <Input className={css.SpecInput} {...props} />
const getId = () => (Math.random() + '').replace('.', '')
const MPSpecialties = ({ form, onKeyDown }) => {
  const { onboarding } = useSelector(state => state)

  const specs = (onboarding?.info?.specialties || ['']).reduce((acc, value) => {
    acc[getId()] = value
    return acc
  }, {})

  const [specialties, setSpecialties] = useState(specs)

  const addSpec = () => {
    setSpecialties({ ...specialties, [getId()]: '' })
  }

  const deleteSpec = (obj, key) => {
    delete obj[key]
    setSpecialties(obj)
  }

  const keys = Object.keys(specialties)

  return (
    <div className={css.wrapperOnboarding}>
      <div className={css.SpecTitle}>Your specialties</div>
      {keys.map(key => (
        <div key={key} className={css.inputSpecial}>
          <Item className={css.wrapperOnboarding}>
            {form.getFieldDecorator(`specialties-${key}`, {
              rules: [
                {
                  required: true,
                  message: 'Specialties can not be empty',
                },
              ],
              normalize: value => value.length < 100 ? value : value.substr(0, 100),
              initialValue: specialties[key],
            })(FormInput({ onKeyDown }))}
          </Item>
          <span className={css.deleteIcon}>
            {keys?.length > 1 && <Icon className={css.deleteBtn} type='trash' size='small' onClick={() => deleteSpec({ ...specialties }, key)} />}
          </span>
        </div>
      ))}
      {keys?.length < 5 && (
        <div className={css.addBtn} onClick={addSpec}>
          <img alt='add' src='/img/plus.svg' className={css.plus} />
          <div className={css.text}>ADD SPECIALTIES</div>
        </div>
      )}
    </div>
  )
}

export default MPSpecialties
