import moment from 'moment'
import React from 'react'
import { YELLOW } from '../../../styles/variables'
import {
  Container,
  CustomButton,
  ErrorMessage,
  IconClose,
  Loading,
  TextArea,
  TextSent,
  Title,
  TitleContainer,
} from '../styled'
import { useScheduleMessage } from './useSheduleMessage'

export const ActiveWorkout = ({
  onClose,
  workout,
  isTemplate,
  setHasMessage,
}) => {
  const {
    loading,
    value,
    updateValue,
    errorText,
    setValue,
    scheduleMessage,
  } = useScheduleMessage(workout, isTemplate, setHasMessage, onClose)

  const isTodayOrBefore = moment(workout.date).isSameOrBefore(Date.now(), 'day')
  const title = isTodayOrBefore
    ? !workout.scheduledMessage || workout.scheduledMessage === ''
      ? 'No Text Sent'
      : 'Text Sent'
    : 'Scheduled Text'

  const closeModal = () => {
    setValue('')
    onClose()
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <IconClose onClick={closeModal} />
      </TitleContainer>
      <TextArea
        value={value}
        onChange={updateValue}
        placeholder='Type your scheduled text for this workout.'
        disabled={isTodayOrBefore}
      />
      {errorText === '' ? null : <ErrorMessage>{errorText}</ErrorMessage>}

      {isTodayOrBefore ? (
        <TextSent>{moment(workout.date).format('MMM Do YYYY')}</TextSent>
      ) : (
        <CustomButton onClick={scheduleMessage} backgroundColor={YELLOW}>
          {loading ? <Loading size={20} /> : 'Save'}
        </CustomButton>
      )}
    </Container>
  )
}
