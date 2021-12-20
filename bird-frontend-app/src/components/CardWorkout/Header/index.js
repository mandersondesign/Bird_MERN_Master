import React, { useState } from 'react'
import { connect } from 'react-redux'

import { delWorkout, getPlanTemplate } from 'modules/library/library-actions'
import { Tooltip, FormWorkout } from 'components'
import { Icon, Popconfirm, Popover } from 'antd'
import css from './index.less'
import { IconsContainer } from './styled'
import { ScheduleTextPopover } from '../../ScheduleTextPopover'

const Header = ({
  workout,
  phase,
  week,
  delWorkout,
  getPlanTemplate,
  onSubmit,
}) => {
  const [flagDescriptionForLinks, setFlagDescriptionForLinks] = useState(true)
  const [visible, setVisible] = useState(false)
  const [visibleSchedule, setVisibleSchedule] = useState(false)
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const day = workout?.date?.split('-')[2]

  const deleteWorkout = async () => {
    const { planTemplateId, planPhaseTemplateId } = phase
    const { planWeekTemplateId } = week
    const { workoutTemplateId } = workout

    await delWorkout(
      planTemplateId,
      planPhaseTemplateId,
      planWeekTemplateId,
      workoutTemplateId,
    )
    getPlanTemplate(planTemplateId)
  }

  const updateVisible = () => setVisible(prevVisible => !prevVisible)
  const updateVisibleSchedule = () =>
    setVisibleSchedule(prevVisible => !prevVisible)

  return (
    <div className={css.header}>
      <div className={css.day}>
        <span className={css.dayLabel}>{days[workout.dayNumber - 1]}</span>
        <span className={css.number}>{day}</span>
      </div>

      <IconsContainer>
        <ScheduleTextPopover
          workout={{
            ...workout,
            phase,
            week,
            planPhaseTemplateId: phase.planPhaseTemplateId,
            planTemplateId: phase.planTemplateId,
            planWeekTemplateId: week.planWeekTemplateId,
          }}
          isVisible={visibleSchedule}
          updateVisible={updateVisibleSchedule}
          isTemplate
        />

        <Popover
          trigger='click'
          content={
            <FormWorkout
              workout={workout}
              onSubmit={onSubmit}
              updateVisible={updateVisible}
              setFlagDescriptionForLinks={setFlagDescriptionForLinks}
              descriptionForLinks={flagDescriptionForLinks}
            />
          }
          visible={visible}
          onVisibleChange={updateVisible}
          overlayClassName={css.popoverWorkout}
        >
          <Tooltip
            title='EDIT'
            content={<Icon type='edit' className={css.icon} />}
          />
        </Popover>

        <Tooltip
          title='DELETE'
          content={
            <Popconfirm
              title='Are you sure you want to delete this workout?'
              onConfirm={deleteWorkout}
              okText='Yes'
              cancelText='No'
            >
              <Icon type='delete' className={css.icon} />
            </Popconfirm>
          }
        />
      </IconsContainer>
    </div>
  )
}

const mapDispatchToProps = () => dispatch => ({
  delWorkout: (planId, phaseId, weekId, workoutId) =>
    dispatch(delWorkout(planId, phaseId, weekId, workoutId)),
  getPlanTemplate: planId => dispatch(getPlanTemplate(planId)),
})

export default connect(null, mapDispatchToProps)(Header)
