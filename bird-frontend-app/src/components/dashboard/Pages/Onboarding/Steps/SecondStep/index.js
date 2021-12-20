import React from 'react'
import { useHistory } from 'react-router-dom'
import css from './index.less'
import { CoachPlans } from 'components'

const SecondStep = ({ subscription = [], goNext }) => {
  const history = useHistory()

  const onFinish = id => {
    goNext()
    return history.push(`/steps/3/plan/${id}`)
  }
  const activeId = window.location.pathname.split('/')[4]

  return (
    <div className={css.wrapperSecondStep}>
      <div className={css.top}>
        You can always change your plan type in your profile page.
      </div>
      <CoachPlans onFinish={onFinish} activeId={activeId} goNext={goNext} />
      <div className={[css.top, css.contactUs].join(' ')}>If you have more than 50 athletes or a training group, please <a target='_blank' rel='noopener noreferrer' href='mailto:hello@bird.coach' className={css.emailToUs}>contact us</a> for pricing</div>
    </div>
  )
}

export default SecondStep
