import React from 'react'
import { connect } from 'react-redux'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import { sessionSelector } from 'modules/session/session-selectors'
import css from './index.less'

import Header from './Header'

const CardWorkout = ({ workout = {}, athlets, phase, week, onSubmit, session: { measurement } }) => {
  const { typesForWorkout, paces } = athlets
  const { workoutTypeId, paceId } = workout
  const type = typesForWorkout.find(i => i.workoutTypeId === workoutTypeId) || ''
  const pace = paces.find(i => i.paceId === paceId) || ''

  return (
    <div className={css.wrapperCard}>

      <Header workout={workout} phase={phase} week={week} onSubmit={onSubmit} />

      <div className={css.body}>
        <div className={css.wrapperType}>
          <span className={css.title}>{workout.name}</span>
          <div className={css.blockType}>
            <span className={css.label}>{type.name}</span>
          </div>
        </div>

        <div className={css.wrapperType}>
          <div className={css.blockType}>
            {workout?.time
              ? (
                <span className={css.labelDistance}>{workout?.time}</span>
              )
              : (
                <>
                  <span className={css.labelDistance}>{workout.distance}</span>
                  <span className={css.milles}>{measurement === 1 ? 'mi' : 'km'}</span>
                </>
              )}
          </div>
        </div>

        {pace ? (
          <div className={css.wrapperType}>
            <span className={css.title}>pace</span>
            <p className={css.textNotes}>{pace.name}</p>
          </div>
        ) : null}
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
  session: sessionSelector(state),
})

export default connect(mapStateToProps, null)(CardWorkout)
