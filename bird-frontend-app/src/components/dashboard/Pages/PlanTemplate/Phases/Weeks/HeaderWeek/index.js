import React from 'react'
import { connect } from 'react-redux'
import { delWeek, getPlanTemplate } from 'modules/library/library-actions'
import { Popconfirm } from 'antd'
import { Tooltip } from 'components'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Icon } from 'components/CustomIcon'
import ImgDrag from '../../drag_24x24.svg'
import css from './index.less'

const HeaderWeek = ({ phase, week, numWeek, delWeek, open, getPlanTemplate, dragHandleProps }) => {
  const question = 'Are you sure you want to delete this week?'

  const stopCollapse = event => event.stopPropagation()

  const deleteWeek = async event => {
    stopCollapse(event)
    const { planTemplateId, planPhaseTemplateId } = phase
    const { planWeekTemplateId } = week

    await delWeek(planTemplateId, planPhaseTemplateId, planWeekTemplateId)
    getPlanTemplate(planTemplateId)
  }

  return (
    <div className={css.wrapperHeaderCollapse}>
      <div className={css.headerCollapse}>
        <div {...dragHandleProps} className={css.wrapperIcon}>
          <ImgDrag onClick={stopCollapse} />
        </div>
        <div className={css.title}>Week {numWeek}</div>
        <Popconfirm onClick={stopCollapse} className={css.iconDel} title={question} okText='Yes' cancelText='No' onConfirm={deleteWeek} onCancel={stopCollapse}>
          <Tooltip className={css.wrapperIcon} title='DELETE' content={<Icon type='trash' size='medium' className={css.icon} />} />
        </Popconfirm>
        <div className={css.description}>{week.description}</div>
      </div>

      {open ? <UpOutlined /> : <DownOutlined />}
    </div>
  )
}

const mapDispatchToProps = () => dispatch => ({
  delWeek: (planId, phaseId, weekId) => dispatch(delWeek(planId, phaseId, weekId)),
  getPlanTemplate: planId => dispatch(getPlanTemplate(planId)),
})

export default connect(null, mapDispatchToProps)(HeaderWeek)
