import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Layout } from '../components'
import { getQuestions, getEvent } from 'modules/feet/feet-actions'

import BasicInfo from './BasicInfo'

const Registration = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuestions(id))
    dispatch(getEvent(id))
  }, [])

  return (
    <Layout>
      <BasicInfo />
    </Layout>
  )
}

export default Registration
