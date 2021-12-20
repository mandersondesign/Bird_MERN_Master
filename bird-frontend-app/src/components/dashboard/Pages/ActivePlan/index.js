import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CoachDashboardContainer,
  Header,
  AthletesControlPanel,
} from '../../components'
import { plans } from 'api'
import { AthleteListHeader, AthleteList } from 'components'
import css from './index.less'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { pageSelector } from 'modules/page/page-selectors'
import {
  loadingPageAthletes,
  setPageAthletes,
  sortAthletes,
  setCurrentSort,
} from 'modules/page/page-actions'

import { useActiveAthletes } from './hooks'

const ActivePlan = props => {
  const {
    getPlanAthletes,
    match: { params },
    plans: { meta },
  } = props
  const dispatch = useDispatch()
  const { pageAthletes, loadingAthletes } = useSelector(pageSelector)

  const onSorted = item => {
    dispatch(loadingPageAthletes(true))
    dispatch(setCurrentSort(item))
    dispatch(sortAthletes(item))
    dispatch(loadingPageAthletes(false))
  }

  useActiveAthletes()

  const getPlanUsers = async (page = 1) => {
    dispatch(loadingPageAthletes(true))

    if (params?.planTemplateId) {
      getPlanAthletes(params?.planTemplateId, page, '', '', '').then(() => {
        dispatch(getAthletesMeta())
      })
    }
    const athletes = await plans.getPlanAthletes(
      params?.planTemplateId,
      page,
      '',
      '',
      '',
      200,
    )
    dispatch(setPageAthletes(athletes.data.athletes))
    dispatch(loadingPageAthletes(false))
  }

  return (
    <CoachDashboardContainer>
      <Header title='My Active Athletes' subTitle={meta?.name} />
      <div className={css.wrapperActivePlan}>
        <AthletesControlPanel onSorted={onSorted} getUsers={getPlanUsers} />
        <AthleteListHeader />
        <AthleteList athleteList={pageAthletes} loading={loadingAthletes} />
      </div>
    </CoachDashboardContainer>
  )
}

export default ActivePlan
