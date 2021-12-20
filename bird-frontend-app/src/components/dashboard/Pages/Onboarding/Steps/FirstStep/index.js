import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploadAvatar, getInfo } from 'modules/onboarding/onboarding-actions'
import { Input } from 'antd'
import { Icon } from 'components/CustomIcon'
import { UploadAvatar } from 'components'
import { isAdmin } from 'utils'
import css from './index.less'

const FirstStep = ({ onChangeFirstStep, dataFirstStep }) => {
  const dispatch = useDispatch()
  const { session, onboarding } = useSelector(state => ({
    session: state.session,
    onboarding: state.onboarding,
  }))
  const userAvatar = session.user?.avatar || '/img/avatar.svg'
  const [initialInputs, setInitialInputs] = useState([...(onboarding?.info?.specialties || [])])

  const addSpec = () => {
    onChangeFirstStep('specialties', [...initialInputs, ''])
    setInitialInputs([...initialInputs, ''])
  }
  const deleteSpec = ind => {
    const updatedSpec = initialInputs.filter(
      (item, index) => index !== ind,
    )
    onChangeFirstStep('specialties', updatedSpec)
    setInitialInputs(updatedSpec)
  }
  const onChangeSpecialties = (index, { target: { value } }) => {
    const val = value.length < 100 ? value : value.substr(0, 100)
    const newSpecialties = initialInputs.map((speciality, key) => index === key ? val : speciality)
    onChangeFirstStep('specialties', newSpecialties)
    setInitialInputs(newSpecialties)
  }

  const onChangeBioInfo = ({ target: { value } }) => {
    const val = value.split(/\s+/).length < 200 ? value : value.split(/\s+/).slice(0, 200).join(' ')
    onChangeFirstStep('about', val)
  }

  const onChangeImage = image => {
    dispatch(uploadAvatar(image))
  }

  useEffect(() => {
    if (onboarding?.info?.specialties.length > 0) {
      setInitialInputs([...onboarding?.info?.specialties])
    } else setInitialInputs(['', '', ''])
  }, [onboarding?.info?.specialties])

  useEffect(() => {
    if (!isAdmin(session.user)) {
      dispatch(getInfo(session.user.userId))
    }
  }, [])
  const focusNext = (condition, event) => {
    if (condition) {
      const form = event.target.form
      const index = Array.prototype.indexOf.call(form, event.target)
      const next = form.elements[index + 1]
      if (next && typeof next === 'object') next.focus()
      event.preventDefault()
      return null
    }
  }
  const onKeyEnter = event => focusNext(event.keyCode === 13, event)
  const onKeyCtrlEnter = event => focusNext(event.keyCode === 13 && event.ctrlKey, event)

  const onSubmit = event => {
    event.preventDefault()
    return null
  }

  return (
    <form className={css.firstStep} onSubmit={onSubmit}>
      <div className={css.top}>
        Your athletes will see this information on your profile page.
      </div>

      <div className={css.section}>
        <UploadAvatar
          src={userAvatar}
          onChangeImage={onChangeImage}
          text='Upload photo'
        />
      </div>

      <div className={css.section}>
        <div className={css.title}>Add a coach bio</div>
        <Input.TextArea
          onKeyDown={onKeyCtrlEnter}
          value={dataFirstStep?.about}
          placeholder='Add text'
          className={css.input}
          rows={3}
          onChange={onChangeBioInfo}
        />
      </div>

      <div className={css.section}>
        <div className={css.title}>What are your specialties as a coach?</div>
        <div className={css.wrapperSpecialties}>
          {initialInputs?.map((i, ind) => (
            <div key={ind}>
              <Input
                onKeyDown={onKeyEnter}
                placeholder='Add text'
                className={css.inputAdd}
                value={i}
                onChange={e => onChangeSpecialties(ind, e)}
              />{' '}
              {initialInputs?.length > 1 && (
                <Icon className={css.deleteBtn} type='trash' size='small' onClick={() => deleteSpec(ind)} />
              )}
            </div>
          ))}
        </div>
        {initialInputs?.length <= 4 && (
          <div className={css.addBtn} onClick={addSpec}>
            <img alt='add' src='/img/plus.svg' className={css.plus} />
            <div className={css.text}>ADD SPECIALTIES</div>
          </div>
        )}
      </div>
    </form>
  )
}

export default FirstStep
