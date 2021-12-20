import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfo } from 'modules/onboarding/onboarding-actions'
import { getCards, getMeasurement } from 'modules/session/session-actions'
import PersonalInformation from './PersonalInformation/index'
import { CoachDashboardContainer } from '../../components'
import ChangePassword from './ChangePassword/index'
import Subscription from './Subscription/index'
import PaymentInfo from './PaymentInfo/index'
import Measurements from './Measurements'
import Header from './components/Header'
import { Settings } from './Tabs'
import { useQuery } from 'hooks'
import css from './index.less'

const Coach = props => {
  const query = useQuery()
  const dispatch = useDispatch()
  const { coachPlan, userId, name: userName } = useSelector(({ session }) => session?.user)
  const [activeTab, setActiveTab] = useState(query.get('tab') || 'profile')

  useEffect(() => {
    dispatch(getInfo(userId))
    dispatch(getCards(userId))
    dispatch(getMeasurement())
  }, [])

  useEffect(() => {
    setActiveTab(query.get('tab') || 'profile')
  }, [props.location.search])

  const profileTab = (
    <>
      <PersonalInformation />
      <Measurements />
      <ChangePassword />
      <Subscription />
      {!(coachPlan?.coachPlanId === 1 || coachPlan?.coachPlanId === 4) && <PaymentInfo />}
    </>
  )

  const tabs = {
    profile: profileTab,
    settings: <Settings />,
  }

  return (
    <CoachDashboardContainer>
      <Header title={userName} {...props} active={activeTab} additionalHeader />
      <div className={css.mainWrapperBody}>
        {tabs[activeTab]}
      </div>
    </CoachDashboardContainer>
  )
}

export default Coach
