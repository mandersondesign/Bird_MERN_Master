import React, { useState, useEffect } from 'react'
import { CoachDashboardContainer, Header } from '../../components'
import Table from 'components/Table'
import { Link } from 'components/Link'
import { Icon } from 'components/CustomIcon'
import { Tooltip } from 'components'
import { SortingMenu } from 'components/CustomMenu'
import { Popover as AntPopover, Popconfirm } from 'antd'
import { Button } from 'components/CustomButton'
import { columns } from 'components/Test/data'
import { NewPlan } from './components'
import moment from 'moment'
import css from './index.less'

const dateSort = [
  {
    name: 'last_update',
    title: 'Sort by Last Update \u2191',
    direction: 'desc',
  },
  {
    name: 'last_update',
    title: 'Sort by Last Update \u2193',
    direction: 'asc',
  },
  {
    name: 'name',
    title: 'Sort by Name (A-Z)',
    direction: 'asc',
  },
  {
    name: 'name',
    title: 'Sort by Name (Z-A)',
    direction: 'desc',
  },
]

const PlanTemplates = props => {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [sortField, setSortField] = useState('last_update')
  const [sortDirection, setSortDirection] = useState('desc')

  const { library: { plans = [] }, getPlansTemplates, deletePlan, getAthletesMeta } = props

  useEffect(() => {
    getPlans()
  }, [sortField, sortDirection])

  const getPlans = () => {
    setLoading(true)
    getPlansTemplates(sortField, sortDirection).then(() => {
      getAthletesMeta()
      setLoading(false)
    })
  }

  const delPlan = async template => {
    await deletePlan(template.planTemplateId)
    getPlans()
  }

  const clickPopover = () => setVisible(!visible)

  const name = (name, plan) => (
    <Link to={`/my_library/${plan?.planTemplateId}/plan_template`} className={css.namePlan}>
      {name}
    </Link>
  )

  const type = (_, item) => (
    <div>
      {item.amountOfWeek} weeks
    </div>
  )

  const lastUpdate = (_, item) => (
    <div>
      {moment(item.lastUpdate).fromNow()}
    </div>
  )

  const actions = (_, item) => (
    <div className={css.actions}>
      <Tooltip
        title='EDIT' content={(
          <Link to={`/my_library/${item?.planTemplateId}/plan_template`} face={Link.FACE_DEFAULT}>
            <Icon type='edit' size='medium' className={css.icon} />
          </Link>
        )}
      />

      <Popconfirm title='Are you sure you want to delete this plan template?' onConfirm={() => delPlan(item)} okText='Yes' cancelText='No'>
        <Tooltip title='DELETE' content={<Icon type='trash' size='medium' />} />
      </Popconfirm>
    </div>
  )

  const onSorted = item => {
    setSortField(item.name)
    setSortDirection(item.direction)
  }

  return (
    <CoachDashboardContainer>
      <Header title='My Library' subTitle='Plan Templates' />
      <div className={css.wrapperLibrary}>
        <div className={css.rootHeader}>
          <SortingMenu items={dateSort} onClick={onSorted} />
          <AntPopover
            trigger='click'
            content={<NewPlan clickPopover={clickPopover} />}
            placement='bottomRight'
          >
            <Button face={Button.FACE_PRIMARY} className={css.button} onClick={clickPopover}>ADD NEW</Button>
          </AntPopover>
        </div>

        <Table
          className={css.tableOfPlanTemplates}
          loading={loading}
          locale={{ emptyText: columns.clients?.length === 0 ? 'No data' : 'No results found' }}
          customColumns={columns.planTemplates({ name, type, lastUpdate, actions })}
          dataSource={plans}
        />
      </div>
    </CoachDashboardContainer>
  )
}

export default PlanTemplates
