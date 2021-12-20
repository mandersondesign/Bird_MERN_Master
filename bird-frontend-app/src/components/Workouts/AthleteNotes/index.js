import React, { useState, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getComments, postComment } from 'modules/workouts/workouts-actions'
import { Input, Button } from 'antd'
import moment from 'moment'
import css from './index.less'

const Message = memo(({ date, text, isFromAthlete }) => {
  const { user } = useSelector(({ session }) => session)
  const { profile } = useSelector(({ athlets }) => athlets)

  const name = isFromAthlete ? profile?.name : user?.name
  const avatar = isFromAthlete ? profile?.avatar : user.avatar

  return (
    <div className={css.message}>
      <img src={avatar} alt='avatar' className={css.avatar} />

      <div className={css.right}>
        <div className={css.name}>{name} <span>{moment(date).format('MM/DD/YYYY, HH:mm A')}</span></div>
        <div className={css.text}>{text || '-'}</div>
      </div>
    </div>
  )
})

const AthleteNotes = ({ workoutId }) => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector(({ session }) => session)
  const { profile } = useSelector(({ athlets }) => athlets)
  const dispatch = useDispatch()

  useEffect(() => {
    getCommentsWorkout()
  }, [])

  const getCommentsWorkout = () => {
    dispatch(getComments(workoutId)).then(res => setMessages(res || []))
  }

  const onChange = e => setValue(e.target.value)

  const handlerComment = () => {
    if (value) {
      setIsLoading(true)

      dispatch(postComment(workoutId, { text: value })).then(res => {
        if (res) {
          setValue('')
          getCommentsWorkout()
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <div className={css.athleteNotes}>
      <div className={css.top}>
        <div className={css.title}>Athlete Notes</div>

        {messages.length ? (
          <div className={css.messages}>
            {messages.map((i, ind) => <Message key={ind} {...i} />)}
          </div>
        ) : (
          <p className={css.valueNotesNone}>None</p>
        )}
      </div>

      {messages.length ? (
        <div className={css.sectionInput}>
          <img src={user.avatar} alt='avatar' className={css.avatar} />

          <div className={css.right}>
            <Input.TextArea
              placeholder={`Type here to reply to ${profile?.name}`}
              className={css.input}
              onChange={onChange}
              value={value}
              autoSize
            />
            <Button
              className={css.btnAdd}
              onClick={handlerComment}
              loading={isLoading}
            >
              reply
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default memo(AthleteNotes)
