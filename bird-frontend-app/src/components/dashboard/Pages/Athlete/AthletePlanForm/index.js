import React, { useState, useRef, useContext } from 'react'
import { connect } from 'react-redux'
import { sessionSelector } from 'modules/session/session-selectors'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import { getAthleteProfile } from 'modules/athlets/athlets-actions'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { openNotification } from 'utils/basic'
import { athletes } from 'api'
import { InputDate, InputNum } from './components'
import { EcoForm, EcoFormItem } from 'components'
import { Button } from 'components/CustomButton'
import { PlanMenu } from 'components/CustomMenu'
import css from './index.less'
import { PullingContext } from '../../../../../providers/PullingAthletes'

const AthletePlanForm = props => {
  const { pullingAthletes } = useContext(PullingContext)
  const {
    athlets: {
      plans,
      profile: { userId },
    },
    getAthleteProfile,
    getAthletesMeta,
    session: { measurement },
  } = props
  const [plan, setPlan] = useState()
  const refForm = useRef(null)

  const handleSubmit = async e => {
    const { fields, errors } = e
    const values = {
      ...fields,
      date: fields.date && fields.date.format('YYYY-MM-DD'),
      plan_template_id: plan ? plan.planTemplateId : 1,
    }

    if (!errors) {
      try {
        await athletes.assignPlan(userId, values)
        getAthletesMeta()
        openNotification('success', {
          message: 'Success',
          description: 'You have successfully assigned a plan.',
        })
        getAthleteProfile(userId)
        pullingAthletes()
      } catch (err) {
        openNotification('error', {
          message: 'Error',
          description: (err?.response?.data?.error || err).toString(),
        })
      }
    }
  }

  const ruleMin = (rule, value, warn) => {
    if (!value) return true
    if (Number.isNaN(Number(value))) return warn('Value must be a number')
    return +value < 1 ? warn('Value can not be less than 1.') : true
  }

  const ruleMax = (rule, value, warn) => {
    if (!value) return true
    if (Number.isNaN(Number(value))) return warn('Value must be a number')
    return +value > 100 ? warn('Value can not be more than 100.') : true
  }

  const selectPlan = e => setPlan(e)

  const card = (title, value, className = false) => {
    return (
      <div className={className || css.wrapperCard}>
        <div className={css.title}>{title}</div>
        {value}
      </div>
    )
  }

  // TODO remove in future (bird-1649 Remove min/max weekly mileage from assign template)
  const weeklyPlan = (
    <div className={css.shortInputs}>
      {card(
        `min weekly ${measurement === 1 ? 'mileage' : 'kilometers'}`,
        <InputNum validator={ruleMin} name='min' />,
      )}
      {card(
        `max weekly ${measurement === 1 ? 'mileage' : 'kilometers'}`,
        <InputNum validator={ruleMax} name='max' />,
      )}
    </div>
  )

  return (
    <EcoForm
      className={css.form}
      onSubmit={handleSubmit}
      wrappedComponentRef={refForm}
    >
      <div className={css.shortInputs}>
        {card(
          'plan template:',
          <EcoFormItem
            form={refForm?.current?.props?.form}
            options={{
              rules: [{ required: true, message: 'Plan can not be empty!!' }],
              trigger: 'onClick',
            }}
          >
            <PlanMenu
              className={css.proileDropDrown}
              name='selectType'
              items={plans}
              onClick={selectPlan}
              showeLink
            />
          </EcoFormItem>,
          css.longWrapperCard,
        )}
      </div>

      <div className={css.shortInputs}>
        {card('starting date', <InputDate name='date' />)}
      </div>

      <div className={css.actions}>
        <Button
          size={Button.SIZE_MEDIUM}
          face={Button.FACE_PRIMARY}
          className={css.button}
          type='submit'
        >
          assign & customize
        </Button>
      </div>
    </EcoForm>
  )
}

const mapStateToProps = state => ({
  session: sessionSelector(state),
  athlets: athletsSelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  getAthleteProfile: id => dispatch(getAthleteProfile(id)),
  getAthletesMeta: () => dispatch(getAthletesMeta()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AthletePlanForm)
