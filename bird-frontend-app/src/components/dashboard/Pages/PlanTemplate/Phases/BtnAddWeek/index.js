import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewWeek, getPlanTemplate } from 'modules/library/library-actions'
import { Button } from 'antd'
import css from './index.less'

const BtnAddWeek = ({ phase }) => {
  const { namesOfWeeks } = useSelector(state => state.library)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { planTemplateId, planPhaseTemplateId, planWeekTemplates } = phase

  const addNew = async () => {
    setLoading(true)
    await dispatch(addNewWeek(namesOfWeeks, planTemplateId, planPhaseTemplateId, { numberOfWeek: planWeekTemplates.length + 1 })).then(() => setLoading(false))
    dispatch(getPlanTemplate(planTemplateId))
  }

  return (
    <div className={css.wrapperBtnWeek}>
      {!phase?.numberOfPhase
        ? <div className={css.title}>Athletes see your notes above their weekly workouts. These can be customized for each athlete once the template is assigned.</div> : null}
      <Button className={css.btnAddWeek} onClick={addNew} loading={loading}>
        add week
      </Button>
    </div>
  )
}

export default BtnAddWeek
