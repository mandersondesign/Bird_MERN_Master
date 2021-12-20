import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploadAvatar } from 'modules/onboarding/onboarding-actions'
import { Modal, Form, Input } from 'antd'
import { UploadAvatar, CoachPlans, FormPayment, EcoForm, EcoFormInput } from 'components'
import CPPaymentForm from 'components/CoachPlans/CPPaymentForm'
import { Button } from 'components/CustomButton'
import MPSpecialties from './MPSpecialties'
import css from './index.less'
import { formatPhoneNumber } from 'utils'
import c from 'classnames'

const { Item } = Form

const FormInput = props => <Input className={css.input} {...props} />

const ModalProfileForm = ({ visible = false, onChange, onFinish, name, form, width = false, textTitle = '' }) => {
  const { user, onboarding } = useSelector(state => ({
    user: state.session.user,
    onboarding: state.onboarding,
  }))
  const dispatch = useDispatch()
  const userAvatar = user?.avatar || '/img/avatar.svg'
  const onChangeImage = image => {
    dispatch(uploadAvatar(image))
  }
  const savePersonalInfo = event => {
    form.validateFields(async (err, values) => {
      if (err) return null
      const spec = Object.keys(values).filter(i => i.includes('specialties-'))
      const formOnboarding = {
        specialties: spec.map(i => values[i].trim()).filter(Boolean),
        about: values.about,
      }
      onFinish(event, values, formOnboarding)
    })
  }
  const focusNext = (condition, event) => {
    if (condition) {
      const form = event.target.form
      const index = Array.prototype.indexOf.call(form, event.target)
      const next = form.elements[index + 1]
      if (typeof next === 'object') next.focus()
      event.preventDefault()
      return null
    }
  }

  const onKeyDown = event => focusNext(event.keyCode === 13, event)
  const onKeyDownCTRL = event => focusNext(event.keyCode === 13 && event.ctrlKey, event)

  const validatePhoneNumber = (rule, value, callback) => {
    callback()
  }

  const actions = (
    <div className={css.wrapperActions}>
      <Button
        face={Button.FACE_SECONDARY}
        size={Button.SIZE_MEDIUM}
        className={css.BtnModal}
        onClick={onChange}
        type='button'
      >Cancel
      </Button>
      <Button
        onClick={e => name === 'password' ? () => onFinish(e, form) : () => savePersonalInfo(e)}
        size={Button.SIZE_MEDIUM}
        face={Button.FACE_PRIMARY}
        className={css.BtnModal}
        type='submit'
      >
        {name === 'password' ? 'Change' : 'Save'}
      </Button>
    </div>
  )

  const onComparePasswords = (rule, value, callback) => {
    if (rule.field === 'confirmPassword') {
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('Passwords do not match')
      } else {
        callback()
      }
    } else if (rule.field === 'newPassword') {
      const confirmValue = form.getFieldValue('confirmPassword')
      if (value && confirmValue && value !== form.getFieldValue('confirmPassword')) {
        callback(<><br /> Passwords do not match</>)
      } else {
        callback()
      }
    }
  }
  const phoneInput = [
    {
      options: {
        rules: [{
          required: true,
          message: 'Phone can not be empty',
        },
        {
          transform: value => formatPhoneNumber(value),
          validator: validatePhoneNumber,
        },
        ],
        initialValue: user.phone,
        trigger: 'onBlur',
        valuePropName: 'defaultValue',
      },
      name: 'phone',
      placeholder: 'Phone',
      mask: 'phone',
      autoComplete: 'off',
      prefix: false,
    },
  ]

  const obj = {
    password: () => (
      <>
        <div className={css.mainTitle}>Change password</div>
        <Form layout='vertical' className={css.form} onSubmit={event => onFinish(event, form)}>
          <Item label='OLD PASSWORD' className={css.item} autoComplete='off'>
            {form.getFieldDecorator('currentPassword', {
              rules: [
                {
                  min: 6,
                  message: 'Old password can not be less than 6 characters',
                },
                {
                  required: true,
                  message: 'Old password can not be empty',
                },
              ],
              initialValue: '',
            })(<Input.Password className={css.input} />)}
          </Item>
          <Item label='NEW PASSWORD' className={css.item} autoComplete='off'>
            {form.getFieldDecorator('newPassword', {
              rules: [
                {
                  min: 6,
                  message: 'New password can not be less than 6 characters',
                },
                {
                  required: true,
                  message: 'New password can not be empty',
                },
                { validator: onComparePasswords },
              ],
              initialValue: '',
            })(<Input.Password className={css.input} />)}
          </Item>
          <Item label='CONFIRM NEW PASSWORD' className={css.item} autoComplete='off'>
            {form.getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: 'Confirm Password can not be empty',
                },
                { validator: onComparePasswords },
              ],
              initialValue: '',
            })(<Input.Password className={css.input} />)}
          </Item>
          {actions}
        </Form>
      </>
    ),
    information: () => (
      <>
        <div className={css.mainTitle}>Personal information</div>
        <UploadAvatar src={userAvatar} onChangeImage={onChangeImage} text='Change photo' />
        <EcoForm layout='vertical' className={css.form} onSubmit={savePersonalInfo}>
          <Item label='FIRST NAME' className={css.item}>
            {form.getFieldDecorator('firstName', {
              rules: [
                {
                  required: true,
                  message: 'First Name can not be empty',
                },
                {
                  max: 32,
                  message: 'First Name should be less than 32 characters.',
                },
                { transform: value => value.trim() },
              ],
              initialValue: user.firstName,
            })(FormInput({ onKeyDown }))}
          </Item>
          <Item label='LAST NAME' className={css.item}>
            {form.getFieldDecorator('lastName', {
              rules: [
                {
                  required: true,
                  message: 'Last Name can not be empty',
                },
                {
                  max: 32,
                  message: 'Last Name should be less than 32 characters.',
                },
                { transform: value => value.trim() },
              ],
              initialValue: user.lastName,
            })(FormInput({ onKeyDown }))}
          </Item>
          <Item label='PHONE' className={css.item}>
            {phoneInput.map((props, i) => <EcoFormInput key={i} {...props} onKeyDown={onKeyDown} />)}
          </Item>

          <MPSpecialties form={form} onKeyDown={onKeyDown} />

          <Item label={<div className={css.title}>Coach bio</div>} className={css.item}>
            {form.getFieldDecorator('about', {
              rules: [
                {
                  required: true,
                  message: 'Short bio can not be empty',
                },
              ],
              normalize: value => {
                const val = value.split(/\s+/)
                return val.length < 200 ? value : val.slice(0, 200).join(' ')
              },
              initialValue: onboarding?.info?.about,
            })(<Input.TextArea onKeyDown={onKeyDownCTRL} />)}
          </Item>
          {actions}
        </EcoForm>
      </>
    ),
    plans: () => (
      <>
        <div className={css.mainTitle}>Change subscription</div>
        <CoachPlans onFinish={onFinish} activeId={user?.coachPlan?.coachPlanId} />
        <div className={c(css.top, css.contactUs)}>
          If you have more than 50 athletes or a training group, please
          {' '}
          <a target='_blank' rel='noopener noreferrer' href='mailto:hello@bird.coach' className={css.emailToUs}>
            contact us
          </a>
          {' '}
          for pricing
        </div>
        <CPPaymentForm />
      </>
    ),
    payment: () => (
      <>
        <div className={css.mainTitle}>{textTitle}</div>
        <FormPayment text='Save' backColor='#F9F9F9' onFinishPay={onFinish} flexDirection='row' />
      </>
    ),
  }

  const attr = { visible, onCancel: onChange, width: width || 400, maxWidth: 400, footer: null, className: 'wrapperModalProfile' }

  return (
    <Modal wrapClassName={css.modalWrapper} {...attr} closable={name !== 'information'}>
      {obj[name]()}
    </Modal>
  )
}

const WrappedFrom = Form.create()(ModalProfileForm)

const ModalProfile = props => <WrappedFrom {...props} />

export default ModalProfile
