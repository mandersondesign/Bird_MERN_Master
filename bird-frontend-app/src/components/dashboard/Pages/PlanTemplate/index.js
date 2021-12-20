import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
  CoachDashboardContainer,
  Header,
} from 'components/dashboard/components'
import { BtnAddNewPhase, HeaderTemplate, WelcomeTextArea } from './components'
import Collapsible from '@andriycidt/react-collapsible'
import HeaderNewPhase from './Phases/HeaderNewPhase'
import { Spin } from 'antd'
import css from './index.less'
import Phases from './Phases'

const PlanTemplate = props => {
  const {
    library: { planTemplate, isNewPhase },
    match: {
      params: { planTemplateId },
    },
    getPlanTemplate,
    getTypesWorkout,
    getPaces,
    resetPlanTemplate,
    setNewPhase,
    sortPlan,
    sortPhasesPlan,
  } = props

  const { planPhaseTemplate = [] } = planTemplate

  let newArr = planPhaseTemplate
    .map((i, index) => ({ ...i, numberOfPhase: index }))
    .sort((a, b) => a.numberOfPhase - b.numberOfPhase)

  let num = 0
  newArr = newArr.map((phase, index) => {
    const planWeekTemplates = phase.planWeekTemplates.map(week => {
      ++num
      return { ...week, num }
    })

    return { ...phase, planWeekTemplates }
  })
  num = 0

  useEffect(() => {
    getPlanTemplate(planTemplateId)
    getTypesWorkout()
    getPaces()

    return () => {
      resetPlanTemplate()
      setNewPhase(false)
    }
  }, [])

  const reorder = (array, startIndex, endIndex) => {
    const result = Array.from(array)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const sortWeeks = array =>
    array.map((i, index) => ({ ...i, numberOfWeek: index + 1 }))
  const getNewPhases = (array, droppableId, newWeeks) =>
    array.map((i, index) =>
      i.planPhaseTemplateId === +droppableId
        ? { ...i, planWeekTemplates: newWeeks }
        : i,
    )

  const onDragEnd = async obj => {
    const { destination, source, type } = obj
    let newPhases

    if (!destination) return null

    if (type === 'COLUMN') {
      newPhases = reorder(
        planPhaseTemplate,
        source.index,
        destination.index,
      ).map((i, index) => ({ ...i, numberOfPhase: index + 1 }))
    } else {
      const phase = planPhaseTemplate.find(
        phase => phase.planPhaseTemplateId === +destination.droppableId,
      )
      const phaseId = planPhaseTemplate.indexOf(phase)
      const panelItemIds = planPhaseTemplate[phaseId].planWeekTemplates

      if (+source.droppableId === +destination.droppableId) {
        const newWeeks = reorder(
          panelItemIds,
          source.index,
          destination.index,
        ).map((j, index) => ({ ...j, numberOfWeek: index + 1 }))
        newPhases = [
          ...planPhaseTemplate.slice(0, phaseId),
          { ...phase, planWeekTemplates: newWeeks },
          ...planPhaseTemplate.slice(phaseId + 1),
        ]
      } else {
        const fromPhase = planPhaseTemplate.find(
          i => i.planPhaseTemplateId === +source.droppableId,
        )
        const toPhase = planPhaseTemplate.find(
          i => i.planPhaseTemplateId === +destination.droppableId,
        )

        const week = fromPhase.planWeekTemplates.find(
          i => i.planWeekTemplateId === +obj.draggableId,
        )

        const fromPhaseNewWeeks = fromPhase.planWeekTemplates.filter(
          i => i.planWeekTemplateId !== +obj.draggableId,
        )
        const toPhaseNewWeeks = [...toPhase.planWeekTemplates]
        toPhaseNewWeeks.splice(destination.index, 0, week)

        const newFromPhaseWeeks = sortWeeks(fromPhaseNewWeeks)
        const newToPhaseWeeks = sortWeeks(toPhaseNewWeeks)

        newPhases = getNewPhases(
          planPhaseTemplate,
          source.droppableId,
          newFromPhaseWeeks,
        )
        newPhases = getNewPhases(
          newPhases,
          destination.droppableId,
          newToPhaseWeeks,
        )
      }
    }

    sortPhasesPlan(newPhases)
    await sortPlan(planTemplateId, { phases: newPhases || planPhaseTemplate })
    // getPlanTemplate(planTemplateId)
  }
  console.log(planTemplate)
  return (
    <CoachDashboardContainer>
      <Header title='My Library' subTitle='Plan Templates' />

      {planTemplate.planTemplateId ? (
        <div className={css.wrapperPlan}>
          <HeaderTemplate />
          <WelcomeTextArea planTemplate={planTemplate} />
          {planPhaseTemplate.length || isNewPhase ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='board' type='COLUMN'>
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {newArr.map((elem, index) => (
                      <Phases
                        key={elem.planPhaseTemplateId}
                        index={index}
                        colId={elem.planPhaseTemplateId}
                        weeks={elem.planWeekTemplates}
                        phase={elem}
                      />
                    ))}
                    {provided.placeholder}
                    {isNewPhase ? (
                      <Collapsible
                        classParentString={css.wrapperCollapse}
                        trigger={<HeaderNewPhase />}
                      />
                    ) : null}
                  </div>
                )}
              </Droppable>
              <BtnAddNewPhase />
            </DragDropContext>
          ) : (
            <div className={css.body}>
              <div className={css.description}>
                Please start by adding at least one phase to your plan. You can
                add a description for each phase with context about the phase’s
                goals, why workouts were chosen and what athletes can expect.
              </div>
              <BtnAddNewPhase />
            </div>
          )}
        </div>
      ) : (
        <div className={css.wrapperSpin}>
          <Spin />
        </div>
      )}
    </CoachDashboardContainer>
  )
}

export default PlanTemplate
