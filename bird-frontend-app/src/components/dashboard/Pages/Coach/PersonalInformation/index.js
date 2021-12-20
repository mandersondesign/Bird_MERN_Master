import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editProfile, getCurrentUser } from 'modules/session/session-actions'
import { onBoardingFirstStep, getInfo } from 'modules/onboarding/onboarding-actions'
import { Button, ModalProfile } from 'components'
import { notification } from 'antd'
import css from '../index.less'
import Information from '../components/Information'
import { formatPhoneNumber } from 'utils'

const PersonalInformation = () => {
  const [visible, setVisible] = useState(false)
  const {
    session: { user: { email, phone, name, avatar, userId }, token },
    onboarding: { info: { specialties = [], about } },
  } = useSelector(state => state)
  const dispatch = useDispatch()

  const onChange = () => setVisible(!visible)

  const informations = [
    {
      title: 'Photo',
      text: avatar,
    },
    {
      title: 'Full name',
      text: name,
    },
    {
      title: 'Phone number',
      text: formatPhoneNumber(phone),
    },
    {
      title: 'Email',
      text: email,
    },
    {
      title: 'Specialties',
      text: specialties.join(', '),
    },
    {
      title: 'Coach bio',
      text: about,
    },
  ]

  const onFinish = async (event, values, formOnboarding) => {
    const { firstName, lastName } = values
    const { phone } = event.fields
    const obj = { firstName, lastName, phone: formatPhoneNumber(phone), email }
    dispatch(editProfile(obj, userId)).then(res => {
      if (res) {
        dispatch(onBoardingFirstStep(userId, { info: formOnboarding })).then(resOn => {
          if (resOn) {
            notification.success({ message: 'Information successfully changed' })

            dispatch(getCurrentUser(token)).then(() => {
              dispatch(getInfo(userId)).then(() => {
                setVisible(!visible)
              })
            })
          }
        })
      }
    })
  }

  return (
    <div className={css.sectionProfile}>
      <div className={css.head}>
        <div className={css.titleSection}>Personal information</div>
        <Button size='default' smallBtn className={css.profileBtn} btnText='Edit' onClick={onChange} />
      </div>

      <div className={css.body}>
        {informations.map((i, ind) => <Information item={i} index={ind} key={i.title} lastIndex={informations.length} />)}
      </div>

      {visible && <ModalProfile visible onChange={onChange} onFinish={onFinish} name='information' />}
    </div>
  )
}

export default PersonalInformation
