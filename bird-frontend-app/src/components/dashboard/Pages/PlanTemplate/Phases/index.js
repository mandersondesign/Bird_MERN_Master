import React from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import Collapsible from '@andriycidt/react-collapsible'
import { librarySelector } from 'modules/library/library-selectors'
import { updatePhase, getPlanTemplate } from 'modules/library/library-actions'
import { Description } from '../components'
import css from './index.less'

import HeaderPhase from './HeaderPhase'
import BtnAddWeek from './BtnAddWeek'
import Weeks from './Weeks'

const Phase = ({ phase, namesOfPhases, planPhaseTemplateId, dragHandleProps, colId, weeks, onSave }) => {
  const { planWeekTemplates, description } = phase
  const open = namesOfPhases.includes(planPhaseTemplateId)
  const header = <HeaderPhase phase={phase} open={open} dragHandleProps={dragHandleProps} />

  const attr = { colId, weeks, phase, planWeekTemplates }

  return (
    <Collapsible open={open} classParentString={css.wrapperCollapse} trigger={header}>
      <div className={css.body}>
        <Description
          description={description}
          onSave={value => onSave(phase, value)}
          title='phase description'
          placeholder='Your Description...'
        />
        <Weeks {...attr} />
        <BtnAddWeek phase={phase} />
      </div>
    </Collapsible>
  )
}

const Phases = props => {
  const {
    library: { namesOfPhases, planTemplate: { planTemplateId } },
    updatePhase, getPlanTemplate, colId, weeks, index, phase,
  } = props

  const { planPhaseTemplateId } = phase

  const onSave = async (phase, description) => {
    const { name, numberOfPhase, planPhaseTemplateId } = phase
    const data = { name, description, numberOfPhase }

    await updatePhase(planTemplateId, planPhaseTemplateId, data)
    getPlanTemplate(planTemplateId)
  }

  const attr = { namesOfPhases, planPhaseTemplateId, phase, onSave, colId, weeks }

  return (
    <Draggable key={colId.toString()} draggableId={colId.toString()} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} key={colId} className={css.wrapperPhasesPlan}>
          <Phase {...attr} dragHandleProps={provided.dragHandleProps} />
        </div>
      )}
    </Draggable>
  )
}

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  updatePhase: (planId, phaseId, data) => dispatch(updatePhase(planId, phaseId, data)),
  getPlanTemplate: planId => dispatch(getPlanTemplate(planId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Phases)
