import React from 'react'
import { Icon } from 'components'

const emailInput = {
  options: {
    rules: [
      { required: true, message: 'Email can not be empty.' },
      { type: 'email', message: 'Email format is not valid.' },
    ],
    initialValue: '',
    trigger: 'onBlur',
    valuePropName: 'defaultValue',
  },
  name: 'email',
  placeholder: 'Email',
  prefix: false,
}

export const prepareActivationInputs = ({ firstFieldText, onBlur, onComparePasswords }) => ([
  {
    options: {
      rules: [{ required: true, message: `${firstFieldText} can not be empty.` }],
      initialValue: '',
    },
    type: 'password',
    name: 'temp_password',
    placeholder: `${firstFieldText}`,
    prefix: <Icon svg type='lock' size={14} />,
  },
  {
    options: {
      rules: [
        { required: true, message: 'New Password can not be empty.' },
        { validator: onComparePasswords },
      ],
      initialValue: '',
    },
    type: 'password',
    name: 'password',
    placeholder: 'New Password',
    prefix: <Icon svg type='lock' size={14} />,
  },
  {
    options: {
      rules: [
        { required: true, message: 'Confirm Password can not be empty.' },
        { validator: onComparePasswords },
      ],
      initialValue: '',
    },
    onBlur,
    type: 'password',
    name: 'confirm_password',
    placeholder: 'Confirm Password',
    prefix: <Icon svg type='lock' size={14} />,
  },
])

export const prepareLoginInputs = [
  {
    options: {
      rules: [
        { type: 'email', message: 'Email format is not valid.' },
        { required: true, message: 'Email can not be empty.' },
      ],
      initialValue: '',
      validateTrigger: ['onBlur', 'onSubmit'],
      normalize: value => value.trim(),
      valuePropName: 'defaultValue',
    },
    name: 'email',
    placeholder: 'Email',
    autoComplete: 'off',
    prefix: false,
  },
  {
    options: {
      rules: [{ required: true, message: 'Password can not be empty.' }],
      initialValue: '',
      validateTrigger: ['onBlur', 'onSubmit'],
      valuePropName: 'defaultValue',
    },
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    autoComplete: 'off',
    prefix: false,
  },
]

export const prepareRegistrationInputs = [
  {
    options: {
      rules: [{ required: true, whitespace: true, message: 'First name can not be empty.' }, { transform: value => value.trim() }],
      initialValue: '',
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    name: 'firstName',
    placeholder: 'First Name',
    autoComplete: 'off',
    prefix: false,
  },
  {
    options: {
      rules: [{ required: true, whitespace: true, message: 'Last name can not be empty.' }, { transform: value => value.trim() }],
      initialValue: '',
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    name: 'lastName',
    placeholder: 'Last Name',
    autoComplete: 'off',
    prefix: false,
  },
  {
    options: {
      rules: [
        // { type: 'email', message: 'Email format is not valid.' },
        { required: true, whitespace: true, message: 'Email can not be empty.' },
        { transform: value => value.trim() },
      ],
      initialValue: '',
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    name: 'email',
    placeholder: 'Email',
    autoComplete: 'off',
    prefix: false,
  },
  {
    options: {
      rules: [{ required: true, message: 'Phone can not be empty.' }],
      initialValue: '',
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    name: 'phone',
    placeholder: 'Phone',
    mask: 'phone',
    autoComplete: 'off',
    prefix: false,
  },
  {
    options: {
      rules: [{ required: true, message: 'Password can not be empty.' }],
      initialValue: '',
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    autoComplete: 'off',
    prefix: false,
  },
]

export const prepareResetInputs = [emailInput]

export const prepareSetPasswordInputs = ({ onBlur, onComparePasswords }) => ([
  {
    options: {
      rules: [
        { required: true, message: 'New Password can not be empty.' },
        { validator: onComparePasswords },
      ],
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    type: 'password',
    name: 'password',
    placeholder: 'New Password',
    prefix: false,
  },
  {
    options: {
      rules: [
        { required: true, message: 'Confirm Password can not be empty.' },
        { validator: onComparePasswords },
      ],
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    type: 'password',
    name: 'confirm_password',
    onBlur,
    placeholder: 'Confirm Password',
    prefix: false,
  },
])

export const prepareInvitePasswordInputs = ({ onBlur, onComparePasswords }) => ([
  {
    options: {
      rules: [
        { required: true, min: 6, message: 'Password can not be empty or less than 6 characters.' },
        { validator: onComparePasswords },
      ],
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    type: 'password',
    name: 'password',
    placeholder: 'New Password',
    prefix: false,
  },
  {
    options: {
      rules: [
        { required: true, message: 'Confirm Password can not be empty.' },
        { validator: onComparePasswords },
      ],
      trigger: 'onBlur',
      valuePropName: 'defaultValue',
    },
    type: 'password',
    name: 'confirm_password',
    onBlur,
    placeholder: 'Confirm Password',
    prefix: false,
  },
])
