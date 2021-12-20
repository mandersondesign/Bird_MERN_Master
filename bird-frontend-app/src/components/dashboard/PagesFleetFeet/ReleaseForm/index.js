import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { accept, getEvent, getWaiver } from 'modules/feet/feet-actions'
import { notification, Skeleton } from 'antd'
import { Layout, Button } from '../components'
import css from './index.less'

const ReleaseForm = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { id } = useParams()
  const { event, waiver } = useSelector(state => state.feet)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvent(id))
    dispatch(getWaiver(id))
  }, [])

  const clickAccept = () => {
    setLoading(true)
    dispatch(accept()).then(() => {
      setLoading(false)
      history.push(`/event/${id}/payment`)
    })
  }

  const clickDecline = () => {
    notification.warning({ message: 'You can not submit the application until you accept' })
  }

  return (
    <Layout>
      <div className={css.wrapperReleaseForm}>
        <div className={css.mainTitle}>{event.name}</div>

        <div className={css.wrapperRules}>

          <div className={css.content}>
            {waiver
              ? (<div dangerouslySetInnerHTML={{ __html: waiver }} />)
              : (<Skeleton active />)}
          </div>
        </div>

        <div className={css.actions}>
          <Button text='decline' type='white' onClick={clickDecline} />
          <Button text='accept' type='black' onClick={clickAccept} loading={loading} />
        </div>
      </div>
    </Layout>
  )
}

export default ReleaseForm
