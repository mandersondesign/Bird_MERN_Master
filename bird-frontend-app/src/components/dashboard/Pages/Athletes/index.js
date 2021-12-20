import React, { useEffect } from 'react'

import { sessionSelector } from 'modules/session/session-selectors'
import { connect, useDispatch, useSelector } from 'react-redux'
import { AthleteList, AthleteListHeader } from 'components'
import {
  AthletesControlPanel,
  CoachDashboardContainer,
  Header,
} from '../../components'
import {
  getAthletes,
  getAthleteProfile,
  delAthlete,
} from 'modules/athlets/athlets-actions'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { pageSelector } from 'modules/page/page-selectors'
import {
  sortAthletes,
  setCurrentSort,
  loadingPageAthletes,
} from 'modules/page/page-actions'
import { logout } from 'modules/session/session-actions'

import css from './index.less'
import { useAllAthletes } from './hooks'

const Athlets = props => {
  const dispatch = useDispatch()
  const {
    location: { pathname },
    getAthletes,
    getAthletesMeta,
    session,
  } = props

  const { pageAthletes, loadingAthletes } = useSelector(pageSelector)
  const subTitle =
    pathname === '/athletes/unassigned' ? 'Unassigned' : 'All Athletes'

  const onSorted = item => {
    dispatch(loadingPageAthletes(true))
    dispatch(setCurrentSort(item))
    dispatch(sortAthletes(item))
    dispatch(loadingPageAthletes(false))
  }

  useAllAthletes()

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = page => {
    if (
      window.location.pathname !== '/' &&
      !window.location.pathname.includes('signUp')
    ) {
      if (session?.user?.isOnboardingCompleted) {
        getAthletes(pathname.replace('/', ''), page || 1, '', '', '').then(
          () => {
            getAthletesMeta()
          },
        )
      }
    }
  }

  return (
    <CoachDashboardContainer>
      <Header title='My Athletes' subTitle={subTitle} {...props} />
      <div className={css.wrapperAthletes}>
        <AthletesControlPanel onSorted={onSorted} getUsers={getUsers} />
        <AthleteListHeader />
        <AthleteList loading={loadingAthletes} athleteList={pageAthletes} />
      </div>
    </CoachDashboardContainer>
  )
}

const mapStateToProps = state => ({
  session: sessionSelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  getAthletes: (...args) => dispatch(getAthletes(...args)),
  userLogout: () => dispatch(logout()),
  getAthleteProfile: id => dispatch(getAthleteProfile(id)),
  delAthlete: id => dispatch(delAthlete(id)),
  getAthletesMeta: () => dispatch(getAthletesMeta()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Athlets)
