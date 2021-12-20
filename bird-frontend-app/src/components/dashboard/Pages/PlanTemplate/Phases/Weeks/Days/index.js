import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import { addWorkout, getPlanTemplate, updateWorkout } from 'modules/library/library-actions'
import { getTypesWorkout } from 'modules/athlets/athlets-actions'
import { EmptyCard, CardWorkout } from 'components'
import css from './index.less'
import moment from 'moment'

const Days = ({ phase, week, athlets: { typesForWorkout, paces } }) => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const dispatch = useDispatch()

  const { planTemplateId, planPhaseTemplateId } = phase
  const { planWeekTemplateId, workouts = [] } = week

  const newDays = days.map((i, index) => workouts.find(j => j.dayNumber === index + 1) || i)

  const onSubmit = (e, form, numDay, workoutId, updateVisible, customTypeForm, setCustomType, choosenWorkout) => {
    e.preventDefault()

    const updateForm = () => {
      updateVisible()
      setCustomType(false)
    }

    form.validateFields(async (err, values) => {
      if (err) return null

      const { pace, type, workout, distance, customType, name, time } = values

      const paceNew = paces.find(i => pace === i.name)
      const typeNew = typesForWorkout.find(i => type === i.name)

      const data = { name: name || workout, description: form.getFieldValue('description') }

      if (distance !== undefined) {
        data.distance = distance
      }
      if (time !== undefined) {
        data.time = moment(time).format('HH:mm')
      }

      if (paceNew?.paceId) {
        data.paceId = paceNew?.paceId
      } else if (pace) {
        data.paceId = pace
      }

      if (typeNew?.workoutTypeId) {
        data.workoutTypeId = typeNew?.workoutTypeId
      } else if (type) {
        data.workoutTypeId = type
      }

      if (customTypeForm) {
        data.workoutTypeId = null
        data.workoutTypeName = customType
      }

      if (workoutId) {
        dispatch(updateWorkout(planTemplateId, planPhaseTemplateId, planWeekTemplateId, workoutId, data)).then(res => {
          if (res) updateForm()
        })
      } else {
        data.dayNumber = numDay

        dispatch(addWorkout(planTemplateId, planPhaseTemplateId, planWeekTemplateId, data)).then(res => {
          if (res) updateForm()
        })
      }

      dispatch(getTypesWorkout()).then(() => dispatch(getPlanTemplate(planTemplateId)))
    })
  }

  return (
    <div className={css.wrapperDays}>
      {newDays.map((i, index) => (
        <div key={index}>
          {i.workoutTemplateId
            ? <CardWorkout workout={i} phase={phase} week={week} onSubmit={(e, form, updateVisible, customType, setCustomType, choosenWorkout) => onSubmit(e, form, index + 1, i.workoutTemplateId, updateVisible, customType, setCustomType, choosenWorkout)} />
            : <EmptyCard day={i} onSubmit={(e, form, updateVisible, customType, setCustomType, choosenWorkout) => onSubmit(e, form, index + 1, null, updateVisible, customType, setCustomType, choosenWorkout)} />}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  addWorkout: (planId, phaseId, weekId, data) => dispatch(addWorkout(planId, phaseId, weekId, data)),
  getPlanTemplate: planId => dispatch(getPlanTemplate(planId)),
  updateWorkout: (planId, phaseId, weekId, workoutId, data) => dispatch(updateWorkout(planId, phaseId, weekId, workoutId, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Days)
