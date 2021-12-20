import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import { sessionSelector } from 'modules/session/session-selectors'
import {
  getPacesCurrentPlan,
  getPlanCurrentAthlete,
  endPlan,
} from 'modules/athlets/athlets-actions'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { Input, Icon } from 'antd'
import { athletes } from 'api'
import { Button } from 'components/CustomButton'
import Card from './Card'
import { useParams } from 'react-router'
import css from './index.less'
import { PullingContext } from '../../../../../providers/PullingAthletes'

const AthleteOtherInfo = props => {
  const { pullingAthletes } = useContext(PullingContext)
  const { athleteId } = useParams()
  const {
    athlets: {
      profile: { plan, userId },
      paces,
      pacesWorkout = [],
    },
    getPacesCurrentPlan,
    getPlanCurrentAthlete,
    endPlan,
  } = props
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => fetchData(), [])

  const fetchData = () => {
    ;(async () => {
      await getNotes()
      await getPlanCurrentAthlete(userId)
      await getPacesCurrentPlan(plan.planId)
    })()
  }

  const getNotes = async () => {
    setLoading(true)
    if (athleteId) {
      athletes
        .getNote(athleteId)
        .then(({ data }) => setNote(data.data.note || ''))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }

  const updateNotes = e => {
    e.preventDefault()
    setLoading(true)
    e.target.blur()
    athletes
      .setNote(athleteId, { note })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const btnEndPlan = () => {
    endPlan(plan.planId, userId)
    pullingAthletes()
  }

  const card = (title, value) => (
    <div className={css.wrapperCard}>
      <div className={css.title}>{title}</div>
      <div className={css.value}>{value || '-'}</div>
    </div>
  )

  const suffix = loading ? <Icon type='loading' spin /> : <span />
  return (
    <div className={css.container}>
      <div className={css.longInputs}>{card('plan name', plan?.name)}</div>
      <hr />

      <div className={css.wrapperPaces}>
        {paces.map((i, index) => {
          const pace = pacesWorkout.find(j => j.paceId === i.paceId) || {}
          return (
            <Card
              key={index}
              title={i.name}
              value={pace.value}
              paceId={i.paceId}
              planId={plan.planId}
            />
          )
        })}
      </div>

      <hr />

      <div className={css.longInputs}>
        <div className={css.wrapperCard}>
          <div className={css.title}>coach notes</div>
          <Input
            onChange={e => setNote(e.target.value)}
            placeholder='Your Note...'
            onPressEnter={updateNotes}
            className={css.input}
            onBlur={updateNotes}
            disabled={loading}
            suffix={suffix}
            value={note}
            name='notes'
          />
        </div>
      </div>

      <hr />

      <div className={css.actions}>
        <Button
          size={Button.SIZE_MEDIUM}
          face={Button.FACE_PRIMARY}
          className={css.btn}
          onClick={btnEndPlan}
        >
          End Plan
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
  session: sessionSelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  getPlanCurrentAthlete: id => dispatch(getPlanCurrentAthlete(id)),
  getPacesCurrentPlan: id => dispatch(getPacesCurrentPlan(id)),
  endPlan: (planId, userId) =>
    dispatch(endPlan(planId, userId)).then(() => dispatch(getAthletesMeta())),
})

export default connect(mapStateToProps, mapDispatchToProps)(AthleteOtherInfo)
