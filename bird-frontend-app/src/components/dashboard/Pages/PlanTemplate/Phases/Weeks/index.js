import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Collapsible from '@andriycidt/react-collapsible'
import { librarySelector } from 'modules/library/library-selectors'
import { updateWeek, getPlanTemplate } from 'modules/library/library-actions'
import { Description } from '../../components'
import HeaderWeek from './HeaderWeek'
import Days from './Days'
import css from './index.less'

const Week = ({ week, namesOfWeeks, phase, onSave, dragHandleProps }) => {
  const open = namesOfWeeks.includes(week.planWeekTemplateId)
  const header = <HeaderWeek phase={phase} week={week} numWeek={week.num} open={open} dragHandleProps={dragHandleProps} />

  return (
    <Collapsible open={open} classParentString={css.wrapperCollapse} trigger={header}>
      <div className={css.body}>
        <Description
          description={week.description}
          title='coach note'
          onSave={value => onSave(week, value)}
          placeholder='Your Note...'
          width='800px'
        />
        <Days phase={phase} week={week} />
      </div>
    </Collapsible>
  )
}

const Weeks = ({ updateWeek, getPlanTemplate, colId, weeks, phase, planWeekTemplates, library: { namesOfWeeks } }) => {
  const onSave = async (week, description) => {
    const { numberOfWeek, planWeekTemplateId } = week
    const { planTemplateId, planPhaseTemplateId } = phase
    const data = { description, numberOfWeek }

    await updateWeek(planTemplateId, planPhaseTemplateId, planWeekTemplateId, data)
    getPlanTemplate(planTemplateId)
  }

  const attr = { namesOfWeeks, phase, onSave }

  const wrapperWeek = (week, index) => (
    <Draggable key={week.planWeekTemplateId.toString()} draggableId={week.planWeekTemplateId.toString()} index={index}>
      {provided => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Week week={week} dragHandleProps={provided.dragHandleProps} {...attr} />
        </div>
      )}
    </Draggable>
  )

  return (
    <Droppable droppableId={colId.toString()}>
      {provided => (
        <div ref={provided.innerRef} style={{ minHeight: 20 }}>
          {weeks.map((elem, index) => wrapperWeek(elem, index))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  updateWeek: (planId, phaseId, weekId, data) => dispatch(updateWeek(planId, phaseId, weekId, data)),
  getPlanTemplate: planId => dispatch(getPlanTemplate(planId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Weeks)
