import React, { useEffect } from 'react'
import { CoachDashboardContainer } from '../../components'
import { MainHeader } from 'components'
import { Spin } from 'antd'
import css from './index.less'

import AthletePlanForm from './AthletePlanForm'
import AthleteProfileForm from './AthleteProfileForm'
import AthleteOtherInfo from './AthleteOtherInfo'
import AthletePlan from './AthletePlan'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomQuestions } from 'modules/session/session-actions'
import { MessageSettings } from './MessageSettings'

const Athlete = props => {
  const {
    athlets: { profile },
    match: {
      params: { athleteId },
    },
  } = props
  const coachId = useSelector(store => store?.session?.user?.userId)
  const dispatch = useDispatch()

  const urlPage = window.location.pathname.split('/')[3]

  useEffect(() => {
    const { getAthleteProfile, getPlans } = props
    if (athleteId && urlPage === 'plan') getAthleteProfile(athleteId)
    if (coachId) dispatch(getCustomQuestions(coachId))
    getPlans()

    return () => {
      const { resetPlanOfAthlete } = props
      const path = window.location.pathname

      if (
        path !== `/athletes/${athleteId}/profile` &&
        path !== `/athletes/${athleteId}/plan`
      ) {
        resetPlanOfAthlete()
      }
    }
  }, [athleteId, urlPage])

  const wrapperProfile = () => (
    <div className={css.tabOfProfile}>
      <div className={css.container}>
        <div className={css.title}>Athlete Profile</div>
        <AthleteProfileForm />
      </div>

      <div className={css.container}>
        <div className={css.title}>Training Plan</div>
        {profile?.plan ? <AthleteOtherInfo /> : <AthletePlanForm />}
      </div>
    </div>
  )

  const objPage = {
    profile: () => wrapperProfile(),
    plan: () =>
      profile?.plan ? (
        <div>
          <AthletePlan />
        </div>
      ) : (
        wrapperProfile()
      ),
  }

  const title = profile?.plan ? profile?.plan?.name : 'Assign Template'
  const subTitle = profile?.plan ? profile?.name : ''

  return (
    <CoachDashboardContainer>
      {profile?.userId ? (
        <div>
          <MainHeader
            title={title}
            subTitle={subTitle}
            additionalHeader={!!profile?.plan}
            {...props}
          />
          <div className={css.wrapperAthletes}>
            {profile?.userId ? objPage[urlPage]() : <Spin />}

            {urlPage === 'profile' ? (
              <MessageSettings athlete={profile} />
            ) : null}
          </div>
        </div>
      ) : null}
    </CoachDashboardContainer>
  )
}

export default Athlete
