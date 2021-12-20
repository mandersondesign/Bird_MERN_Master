import React from 'react'
import css from './styles.less'
import { Button } from 'components/CustomButton'
import { push } from 'modules/router'
import c from 'classnames'


const CompleteOnBoarding = () => {
  const ButtonHandler = () => {
    push('/athletes')
  }

  return (
    <div className={css.container}>
      <div className={css.titleSection}>
        <p className={css.title}> You're in! 🙌</p>
      </div>
      <div className={css.descriptionSection}>
        <p className={css.description}>Let's get you up and running with your account.
        </p>
        <div className={css.btnSection}>
          <Button size={Button.SIZE_LARGE} face={Button.FACE_PRIMARY} onClick={ButtonHandler}>
            TAKE ME THERE
          </Button>
        </div>
      </div>
      <div className={css.pointersSection}>
        <p className={css.pointerTitle}>Want some pointers?</p>
        <p className={css.pointerDescription}>You can check out our{' '}
          <a className={c(css.blueLink, css.hoherType)} target='_blank' rel='noopener noreferrer' href='https://bird.coach/getting-started'>Coach Guide</a><br />or schedule an{' '}
          <a className={c(css.blueLink, css.hoherType)} target='_blank' rel='noopener noreferrer' href='https://calendly.com/birdcoach/coach-onboarding-call?month=2020-06'>onboarding call</a> with the Bird team
        </p>
      </div>
    </div>
  )
}

export default CompleteOnBoarding
