import React from 'react'
import { YELLOW } from '../../../styles/variables'
import {
  Container,
  CustomButton,
  ErrorMessage,
  IconClose,
  Loading,
  TextArea,
  Title,
  TitleContainer,
} from '../styled'
import { useScheduleMessage } from './useScheduleMessage'

export const WorkoutTemplate = ({ onClose, workout, setHasMessage }) => {
  const {
    loading,
    value,
    updateValue,
    errorText,
    setValue,
    scheduleMessage,
  } = useScheduleMessage(workout, setHasMessage, onClose)

  const closeModal = () => {
    setValue('')
    onClose()
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Schedule Text</Title>
        <IconClose onClick={closeModal} />
      </TitleContainer>
      <TextArea
        value={value}
        onChange={updateValue}
        placeholder='Type your scheduled text for this workout.'
      />
      {errorText === '' ? null : <ErrorMessage>{errorText}</ErrorMessage>}

      <CustomButton onClick={scheduleMessage} backgroundColor={YELLOW}>
        {loading ? <Loading size={20} /> : 'Save'}
      </CustomButton>
    </Container>
  )
}
