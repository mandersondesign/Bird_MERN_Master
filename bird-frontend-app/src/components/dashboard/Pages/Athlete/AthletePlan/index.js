import React, { useEffect, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import {
  addWeekForPlan,
  getPacesCurrentPlan,
  getPlanCurrentAthlete,
  setPlanAthlete,
} from 'modules/athlets/athlets-actions'
import { sortWeeks } from 'modules/plans/plans-actions'
import moment from 'moment'
import { Spin, Button } from 'antd'
import css from './AthletePlan.less'
import ListWeeks from './ListWeeks'
import Charts from './Charts'

const AthletePlan = ({
  athlets: { profile, planCurrentAthlete, pacesWorkout, lineChart },
}) => {
  const [showPrevWeeks, setShowPrevWeeks] = useState(false)
  const [isSpinner, setIsSpinner] = useState(true)
  const [loading, setLoading] = useState(false)
  const [newPhases, setNewPhases] = useState([])
  const [placeholderProps, setPlaceholderProps] = useState({})
  const dispatch = useDispatch()

  const currentPhases = planCurrentAthlete?.meta?.phases.current
  const currentWeeks = planCurrentAthlete?.meta?.weeks.current
  const scheduledMessage = planCurrentAthlete?.data?.scheduledMessage
  const phases = planCurrentAthlete?.data?.phases || []

  let startDate = moment(planCurrentAthlete?.data?.startDate).format(
    'YYYY-MM-DD',
  )

  useEffect(() => {
    if (phases.length) {
      const newPhases = phases.map(phase => {
        const sortWeeks = phase.weeks.sort(
          (a, b) => a.numberOfWeek - b.numberOfWeek,
        )

        const weeks = sortWeeks?.map(week => {
          const workouts = []

          for (let i = 0; i < 7; i++) {
            const findWorkout =
              week?.workouts?.find(
                j => moment(j.date).format('YYYY-MM-DD') === startDate,
              ) || {}

            workouts[i] = { ...findWorkout, date: startDate }

            startDate = moment(startDate)
              .add(1, 'days')
              .format('YYYY-MM-DD')
          }

          return { ...week, workouts }
        })

        return { ...phase, weeks }
      })

      setNewPhases(newPhases)
    }
  }, [planCurrentAthlete])

  const getPlan = () => dispatch(getPlanCurrentAthlete(profile?.userId))

  useEffect(() => {
    if (!lineChart || !planCurrentAthlete.data) {
      getPlan()
    } else {
      setIsSpinner(true)
    }
    dispatch(getPacesCurrentPlan(profile?.plan?.planId))
  }, [window.location.pathname])

  setTimeout(() => setIsSpinner(false), 0)

  if (!lineChart.lineChart || !planCurrentAthlete.data || isSpinner) {
    return (
      <div className={css.wrapperSpin}>
        <Spin />
      </div>
    )
  }

  const addWeek = () => {
    setLoading(true)
    dispatch(
      addWeekForPlan(
        planCurrentAthlete.data.planId,
        { description: 'Your Note...' },
        profile.userId,
      ),
    ).then(() => setLoading(false))
  }

  const clickBtnPrev = () => setShowPrevWeeks(!showPrevWeeks)

  const onDragUpdate = update => {
    if (!update.destination) return

    const draggableId = update.draggableId
    const destinationIndex = update.destination.index
    const queryAttr = 'data-rbd-draggable-id'
    const domQuery = `[${queryAttr}='${draggableId}']`
    const draggedDOM = document.querySelector(domQuery)

    if (!draggedDOM) return

    const { clientHeight, clientWidth } = draggedDOM

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr)
          const marginBottom = parseFloat(style.marginBottom)
          return total + curr.clientHeight + marginBottom
        }, 0)

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft,
      ),
      destination: update.destination.droppableId,
    })
  }

  const listWeeks = i => (
    <Droppable droppableId={i.phaseNumber.toString()} key={i.phaseNumber}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ position: 'relative' }}
        >
          {i.weeks.map(
            (j, index) =>
              (j.numberOfWeek >= currentWeeks || showPrevWeeks) &&
              j?.workouts?.length && (
                <ListWeeks
                  key={j.numberOfWeek}
                  index={index}
                  phases={i}
                  week={j}
                  numberWeek={planCurrentAthlete.data.weeks}
                  getPlan={getPlan}
                  currentWeeks={currentWeeks}
                  meta={planCurrentAthlete?.meta?.workouts}
                />
              ),
          )}
          {provided.placeholder}
          {i.phaseNumber === +placeholderProps?.destination && (
            <div
              style={{
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                width: placeholderProps.clientWidth,
              }}
              className={css.wrapperPlaceholder}
            />
          )}
        </div>
      )}
    </Droppable>
  )

  const findPhase = id => newPhases?.find(phase => phase.phaseNumber === id)
  const findWeek = (phase, id) => phase?.weeks?.find((i, index) => index === id)

  const onDragEnd = async obj => {
    setPlaceholderProps({})
    const { source, destination } = obj
    if (
      !destination ||
      !source ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    ) {
      return null
    }

    let newPhase = []

    if (+source.droppableId === +destination.droppableId) {
      const phase = findPhase(+source.droppableId)

      const fromPhaseWeek = findWeek(phase, source.index)
      const toPhaseWeek = findWeek(phase, destination.index)

      const newFromPhaseWeek = {
        ...fromPhaseWeek,
        workouts: fromPhaseWeek.workouts.map((i, ind) => ({
          ...i,
          date: toPhaseWeek.workouts[ind].date,
        })),
      }
      const newToPhaseWeek = {
        ...toPhaseWeek,
        workouts: toPhaseWeek.workouts.map((i, ind) => ({
          ...i,
          date: fromPhaseWeek.workouts[ind].date,
        })),
      }

      newPhase = phase.weeks.map(week =>
        week.weekId === newFromPhaseWeek.weekId
          ? newToPhaseWeek
          : week.weekId === newToPhaseWeek.weekId
            ? newFromPhaseWeek
            : week,
      )

      const weeks = newPhase.map(week => ({
        ...week,
        weekId: week.weekId,
        numberOfWeek: week.numberOfWeek,
      }))

      newPhase = { phaseNumber: phase.phaseNumber, weeks }

      newPhase = newPhases.map(phase =>
        phase.phaseNumber === newPhase.phaseNumber
          ? { phaseNumber: newPhase.phaseNumber, weeks: newPhase.weeks }
          : { phaseNumber: phase.phaseNumber, weeks: phase.weeks },
      )
    } else {
      const fromPhase = findPhase(+source.droppableId)
      const toPhase = findPhase(+destination.droppableId)

      const fromPhaseWeek = findWeek(fromPhase, source.index)
      const toPhaseWeek = findWeek(toPhase, destination.index)

      const indexToWeek = toPhaseWeek
        ? toPhase.weeks.indexOf(toPhaseWeek)
        : toPhase.weeks.length

      const newFromPhaseWeeks = {
        ...fromPhase,
        weeks: fromPhase.weeks.filter(
          week => week.weekId !== fromPhaseWeek.weekId,
        ),
      }
      const newToPhaseWeeks = {
        ...toPhase,
        weeks: [
          ...toPhase.weeks.slice(0, indexToWeek),
          fromPhaseWeek,
          ...toPhase.weeks.slice(indexToWeek),
        ],
      }

      newPhase = newPhases.map(phase =>
        phase.phaseNumber === fromPhase.phaseNumber
          ? newFromPhaseWeeks
          : phase.phaseNumber === toPhase.phaseNumber
            ? newToPhaseWeeks
            : phase,
      )

      newPhase = newPhase.map(phase => ({
        phaseNumber: phase.phaseNumber,
        weeks: phase.weeks.map(week => ({
          ...week,
          weekId: week.weekId,
          numberOfWeek: week.numberOfWeek,
        })),
      }))
    }

    let index = 0

    newPhase = newPhase.map(phase => ({
      ...phase,
      weeks: phase.weeks.map(week => {
        index = index + 1
        return { ...week, numberOfWeek: index }
      }),
    }))

    setNewPhases(newPhase)
    dispatch(setPlanAthlete(newPhase))
    dispatch(
      sortWeeks(planCurrentAthlete.data.planId, { phases: newPhase }),
    ).then(() => getPlan())
  }

  return (
    <div className={css.listPhases}>
      {scheduledMessage && scheduledMessage !== '' ? (
        <>
          <span className={css.welcomeTextTitle}>Welcome Text</span>
          <span className={css.welcomeText}>{scheduledMessage}</span>
        </>
      ) : null}

      <Charts data={planCurrentAthlete} lineChart={lineChart} />

      {!showPrevWeeks && currentWeeks !== 1 ? (
        <Button className={css.btnPrevWeeks} onClick={clickBtnPrev}>
          show previous weeks
        </Button>
      ) : null}

      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        {newPhases.map(
          i => (i.phaseNumber >= currentPhases || showPrevWeeks) && listWeeks(i),
        )}
      </DragDropContext>

      <div className={css.wrapperBtnAddWeek}>
        <Button className={css.btnAddWeek} loading={loading} onClick={addWeek}>
          add new week
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
})

export default connect(mapStateToProps, null)(AthletePlan)
