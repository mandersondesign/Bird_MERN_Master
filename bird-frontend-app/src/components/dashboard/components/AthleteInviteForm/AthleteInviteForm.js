import React, { PureComponent } from 'react'
import { array, func, string } from 'prop-types'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { EcoForm, EcoFormInput } from 'components'
import { Button } from 'components/CustomButton'
import { connect } from 'react-redux'

import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter } from 'utils/props'
import { openNotification } from 'utils/basic'
import { athletes } from 'api'

import './AthleteInviteForm.scss'
import './AthleteInviteForm.less'

const FORM_DEFAULT = [
  {
    options: {
      rules: [
        { type: 'email', message: 'Email format is not valid.' },
        { required: true, message: 'Email can not be empty.' },
      ],
      validateTrigger: 'onBlur',
      normalize: value => value?.trim(),
    },
    name: 'email',
    placeholder: '',
    label: "ATHLETE'S EMAIL",
    autoComplete: 'off',
    prefix: false,
    size: 'default',
  },
  {
    options: {
      rules: [
        { required: true, message: 'First name can not be empty.' },
      ],
      validateTrigger: 'onBlur',
      normalize: value => value?.trim(),
    },
    name: 'first_name',
    placeholder: '',
    label: "ATHLETE'S FIRST NAME",
    autoComplete: 'off',
    prefix: false,
    size: 'default',
  },
  {
    options: {
      rules: [
        { required: true, message: 'Last name can not be empty.' },
      ],
      validateTrigger: 'onBlur',
      normalize: value => value?.trim(),
    },
    name: 'last_name',
    placeholder: '',
    label: "ATHLETE'S LAST NAME",
    autoComplete: 'off',
    prefix: false,
    size: 'default',
  },
  {
    options: {
      rules: [
        { required: true, message: 'Phone can not be empty.' },
      ],
      validateTrigger: 'onBlur',
      normalize: value => value?.trim(),
    },
    name: 'phone',
    placeholder: '',
    label: "ATHLETE'S PHONE",
    mask: 'phone',
    autoComplete: 'off',
    prefix: false,
    size: 'default',
  },
]

export const AthleteInviteFormPropTypes = {
  ...ElementPropTypes,
  title: string.isRequired,
  onVisible: func.isRequired,
  formItems: array.isRequired,
}

export const AthleteInviteFormDefaultProps = {
  title: 'Invite New Athlete',
  onVisible: () => { },
  formItems: FORM_DEFAULT,
}

class AthleteInviteForm extends PureComponent {
  static propTypes = { ...AthleteInviteFormPropTypes };

  static defaultProps = { ...AthleteInviteFormDefaultProps };

  static className = 'AthleteInviteForm';

  static FORM_DEFAULT = FORM_DEFAULT;

  handleSubmit = async e => {
    const { onVisible, getAthletesMeta, getUsers = () => {} } = this.props
    if (!e.errors) {
      try {
        const data = {
          ...e.fields,
          first_name: e.fields.first_name.trim(),
          last_name: e.fields.last_name.trim(),
        }
        await athletes.inviteAthlete(data)
        onVisible(false)()
        getAthletesMeta()
        getUsers()
        openNotification('success', {
          message: 'Success',
          description: 'You have successfully sent invite',
        })
        e.onSuccess()
      } catch (err) {
        openNotification('error', {
          message: 'Error',
          description: (err?.response?.data?.error || err).toString(),
        })
      }
    }
  };

  renderInput = (props, i) => <EcoFormInput key={i} {...props} />;

  renderForm() {
    const { formItems } = this.props
    return formItems.map(this.renderInput)
  }

  renderActions() {
    const { onVisible } = this.props
    return (
      <div className={bem.element(this, 'actions')}>
        <Button
          size={Button.SIZE_MEDIUM}
          face={Button.FACE_PRIMARY}
          type='submit'
        >
          SEND INVITE
        </Button>
        <Button
          className={bem.element(this, 'button')}
          size={Button.SIZE_MEDIUM}
          face={Button.FACE_LINK}
          type='reset'
          onClick={onVisible(false)}
        >
          CANCEL
        </Button>
      </div>
    )
  }

  render() {
    const { title, ...props } = this.props

    return (
      <div
        className={bem.block(this)}
        {...filter(props, ElementPropTypes)}
      >
        <div className={bem.element(this, 'title')}>{title}</div>
        <EcoForm
          className={bem.element(this, 'form')}
          onSubmit={this.handleSubmit}
        >
          {this.renderForm()}
          {this.renderActions()}
        </EcoForm>
      </div>
    )
  }
}

const mapDispatchToProps = () => dispatch => ({
  getAthletesMeta: () => dispatch(getAthletesMeta()),
})

export default connect(null, mapDispatchToProps)(AthleteInviteForm)
