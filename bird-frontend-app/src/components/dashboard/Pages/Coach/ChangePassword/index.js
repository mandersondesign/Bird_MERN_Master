import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, ModalProfile } from 'components'
import { changePasswordProfile } from 'modules/session/session-actions'
import css from '../index.less'
import Information from '../components/Information'

const ChangePassword = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const onChange = () => setVisible(!visible)
  const onFinish = (event, form) => {
    event.preventDefault()

    form.validateFields(async (err, values) => {
      if (err) return null
      const { currentPassword, newPassword } = values
      const obj = { oldPassword: currentPassword, newPassword: newPassword }
      const res = await dispatch(changePasswordProfile(obj))
      if (res === 'ok') {
        onChange()
      }
      // if (res?.response?.data?.error === 'Wrong password') {
    })
  }

  const informations = [
    {
      title: 'Password',
      text: '',
    },
  ]

  return (
    <div className={[css.sectionProfile, css.sectionProfileRow].join(' ')}>
      <div className={css.body}>
        {informations.map((i, ind) => <Information item={i} index={ind} key={i.title} lastIndex={informations.length} />)}
      </div>
      <Button size='default' smallBtn className={css.profileBtn} btnText='Change' onClick={onChange} />
      {visible && <ModalProfile visible={visible} onChange={onChange} onFinish={onFinish} name='password' />}
    </div>
  )
}

export default ChangePassword
