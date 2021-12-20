import React from 'react'
import { connect } from 'react-redux'
import { EcoForm } from 'components'
import { athletsSelector } from 'modules/athlets/athlets-selectors'
import { sessionSelector } from 'modules/session/session-selectors'
import moment from 'moment'
import css from './index.less'

const AthleteProfileForm = props => {
  const { measurement, questions } = props?.session || {}
  const { userInfo } = props?.athlets?.profile || {}
  const { customQuestions, comment } = userInfo || {}

  const personalGoalId = ['Building endurance', 'Getting faster', 'Preventing injury', 'Maintaining your base']
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const userDays = userInfo?.days.map(i => days[i]).join(', ') || []

  const card = (title, value) => (
    <div className={css.wrapperCard}>
      <div className={css.title}>{title}</div>
      <div className={css.value}>{value || '-'}</div>
    </div>
  )

  const cardRecords = title => {
    const personalRecord = userInfo?.personalRecord || {}
    const personalRecordLength = Object.values(personalRecord).filter(Boolean).length

    const obj = {
      k5: '5K',
      k10: '10K',
      halfMarathon: 'Half Marathon',
      marathon: 'Marathon',
    }

    return (
      <div className={css.cardRecords}>
        <div className={css.title}>{title}</div>
        <div className={css.value}>
          {personalRecordLength
            ? Object.keys(personalRecord).map(i => personalRecord[i] && <span key={i}>{obj[i] || i}: {personalRecord[i]}</span>)
            : '-'}
        </div>
      </div>
    )
  }

  const getTime = item => {
    const { distance } = item?.event || {}
    const { type, value = '' } = item?.goal || {}

    if (value && distance) {
      const timeArr = value.split(':')
      let numberedTime, editedTime

      if (type === 2) {
        numberedTime = +timeArr[0] * 60 + +timeArr[1]
        editedTime = numberedTime * distance
      } else {
        numberedTime = +timeArr[0] * 60 * 60 + +timeArr[1] * 60
        editedTime = numberedTime / distance
      }

      return moment.utc(editedTime * 1000).format('HH:mm:ss')
    }

    return '-'
  }

  const renderAnswersForQuestions = () => {
    if (Object.keys(customQuestions || {})?.length) {
      return Object.entries(customQuestions || {}).map((obj, index) => {
        const [question, answer] = obj
        return (<div className={css.longInputs} key={index}>{card(question, answer)}</div>)
      })
    }
    return (questions || []).map((q, i) => <div className={css.longInputs} key={i}>{card(q, '-')}</div>)
  }

  return (
    <EcoForm className={css.form}>

      <div className={css.shortInputs}>
        {card('Event', userInfo?.event?.name || userInfo?.raceName || userInfo?.eventType?.name)}
        {card('Level', userInfo?.level?.name)}
      </div>

      <div className={css.shortInputs}>
        {userInfo?.goal?.type === null ? (
          <>
            {card('goal time', userInfo?.goal?.value)}
            {card('goal pace', userInfo?.goal?.type === 2 ? userInfo?.goal?.value : userInfo ? getTime(userInfo) : '-')}
          </>
        ) : (
          <>
            {card('goal time', userInfo?.goal?.type === 1 ? userInfo?.goal?.value : userInfo ? getTime(userInfo) : '-')}
            {card('goal pace', userInfo?.goal?.type === 2 ? userInfo?.goal?.value : userInfo ? getTime(userInfo) : '-')}
          </>
        )}
      </div>

      <div className={css.shortInputs}>
        {card('date of race', userInfo?.date)}
        {card('completed before', userInfo?.pastExperience?.name)}
      </div>

      <div className={css.shortInputs}>
        {card(`current ${measurement === 1 ? 'miles' : 'kilometers'} per week`, userInfo?.milesPerWeek?.name?.replace('Miles', measurement === 1 ? 'Miles' : 'Kilometers'))}
        {card('a current long run', userInfo?.longDistance?.name?.replace('Miles', measurement === 1 ? 'Miles' : 'Kilometers'))}
      </div>

      <div className={css.shortInputs}>
        {cardRecords('current records')}
        {card('most important goal', personalGoalId[userInfo?.personalGoalId - 1])}
      </div>

      <div className={css.longInputs}>
        {card('committed training days', userDays.length && userDays)}
      </div>

      {!!(Object.keys(customQuestions || {})?.length || questions?.length) && (
        <><hr /> {renderAnswersForQuestions()}</>
      )}

      <hr />
      <div className={css.longInputs}>
        {card('athlete notes', comment || '')}
      </div>

    </EcoForm>
  )
}

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
  session: sessionSelector(state),
})

export default connect(mapStateToProps)(AthleteProfileForm)
