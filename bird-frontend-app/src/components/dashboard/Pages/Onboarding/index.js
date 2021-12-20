import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FirstStep, SecondStep, ThirdStep } from './Steps'
import { Progress } from 'antd'
import { Button } from 'components/CustomButton'
import css from './index.less'
import { onBoardingFirstStep, getInfo, subscriptionPlan } from 'modules/onboarding/onboarding-actions'
import { getCurrentUser } from 'modules/session/session-actions'
import { fetchSubscriptionsForCoaches } from 'modules/subscriptions/subscriptions-actions'
import { isAdmin } from 'utils'
import c from 'classnames'

const Onboarding = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { session, onboarding, subscriptions: { coachPlans: subscription } } = useSelector(state => state)
  const step = window.location.pathname.split('/')[2]
  const [dataFirstStep = onboarding.info, setDataFirstStep] = useState()
  const [loading, setLoading] = useState(false)
  const path = window.location.pathname.split('/')
  const activeId = path[4]

  useEffect(() => {
    if (!isAdmin(session.user)) {
      dispatch(getInfo(session.user.userId))
      dispatch(fetchSubscriptionsForCoaches())
    }
  }, [])

  const onChangeFirstStep = (name, data) => setDataFirstStep({
    ...dataFirstStep,
    [name]: data,
  })

  const objTitle = {
    1: 'Build your profile',
    2: 'Choose a plan',
    3: 'Checkout',
  }

  const objContent = {
    1: () => <FirstStep onChangeFirstStep={onChangeFirstStep} dataFirstStep={dataFirstStep} />,
    2: () => <SecondStep subscription={subscription} goNext={goNext} />,
    3: () => <ThirdStep onFinishPay={onFinishPay} />,
  }

  const goBack = () => {
    if (path.includes('plan')) {
      history.push(`/steps/${path[2] - 1}/plan/${activeId}`)
    } else {
      history.push(`/steps/${path[2] - 1}`)
    }
  }

  const goNextStep = () => {
    const path = window.location.pathname
    const num = +step + 1
    if (step === '1') {
      if (path.includes('plan')) {
        const activeId = path.split('/')[4]
        history.push(`/steps/3/plan/${activeId}`)
      } else {
        history.push('/steps/2/')
      }
    } else if (path.includes('plan')) {
      const activeId = path.split('/')[4]
      history.push(`/steps/${num}/plan/${activeId}`)
    }
  }

  const goNext = () => {
    setLoading(true)
    if (step === '1') {
      dispatch(onBoardingFirstStep(session.user.userId, {
        info: {
          images: dataFirstStep.images,
          about: dataFirstStep?.about?.trim(),
          specialties: dataFirstStep.specialties.filter(w => w.trim().length > 0),
        },
      })).then(res => {
        if (res !== 'error') goNextStep()
        setLoading(false)
      })
    }
    if (step === '2') goNextStep()
  }

  const progressBar = steps => {
    switch (steps) {
    case '1':
      return 35
    case '2':
      return 70
    case '3':
      return 100
    }
  }

  const onFinishPay = (token, func = () => { }) => {
    const data = {
      coachPlanId: window.location.pathname.split('/')[4],
      token: token.id,
    }

    dispatch(subscriptionPlan(data)).then(res => {
      if (res !== 'error') {
        dispatch(getCurrentUser(session.token)).then(() => {
          func()
          history.push('/completeonboarding')
        })
      }
    })
  }

  return (
    <div className={css.mainWrapperOnboarding}>
      <div className={css.wrapperOnboarding}>
        <div className={css.header}>
          <Progress className={css.progressText} type='circle' percent={progressBar(step)} strokeColor='#f8e100' width={70} format={() => `${step} of 3`} />
          <div className={css.title}>{objTitle[step]}</div>
        </div>
        <div className={css.wrapperStep}>
          {objContent?.[step]?.()}
        </div>
        <div className={css.actions}>
          {step === '2' && !activeId && (
            <Button size={Button.SIZE_LARGE} face={Button.FACE_SECONDARY} onClick={goBack} className={css.fontFamily}>
              back
            </Button>
          )}
          {((step !== '3' && step !== '2') || (step === '2' && activeId)) && (
            <Button size={Button.SIZE_LARGE} face={Button.FACE_PRIMARY} onClick={goNext} loading={loading} className={c(css.marginLeft, css.fontFamily)}>
              {step === '3' ? 'complete' : 'next'}
            </Button>
          )}
          {(step === '3' && window.location.pathname.split('/')[4] === '1') && (
            <Button size={Button.SIZE_LARGE} face={Button.FACE_PRIMARY} onClick={onFinishPay} loading={loading} className={c(css.marginLeft, css.fontFamily)}>
              complete
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding
