import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCustomQuestions,
  updateCustomQuestions,
} from 'modules/session/session-actions'
import Question from '../components/Questions'
import { Divider } from 'components'
import css from './index.less'

export default () => {
  const dispatch = useDispatch()
  const { questions, user: { userId } } = useSelector(({ session }) => session)

  useEffect(() => {
    dispatch(getCustomQuestions(userId))
  }, [])

  const onSubmit = questions => dispatch(updateCustomQuestions(userId, { questions }))

  return (
    <div className={css.root}>
      <h3 className={css.title}>Settings</h3>
      <Divider />
      <div className={css.sectionContainer}>
        <div className={css.sectionLeft}>
          <div className={css.sectionTitle}>Customize Onboarding</div>
          <div className={css.sectionParagraph}>
            Create your own intake questions for a new athlete.
          </div>
        </div>
        <div className={css.sectionRight}>
          <Question storeQuestions={questions} onSubmit={onSubmit} />
        </div>
      </div>
      <Divider />
    </div>
  )
}
