import { useState } from 'react'
import { workouts } from 'api'

export const useScheduleMessage = (
  workout,
  isTemplate,
  setHasMessage,
  onClose,
) => {
  const initialMessage = workout?.scheduledMessage || ''
  const [value, setValue] = useState(initialMessage)
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const updateValue = event => {
    setValue(event.target.value)
    setErrorText('')
  }

  const scheduleMessage = async () => {
    try {
      setLoading(true)
      const response = await workouts.scheduleMessage(workout?.workoutId, {
        scheduledMessage: value,
      })

      handleResponse(response)
      setLoading(false)
      onClose()
    } catch (error) {
      handleError(error)
      setLoading(false)
    }
  }

  const handleError = error => {
    if (error.message.includes('403')) {
      setErrorText("Your are not allowed to update someone else's workout!")
    }
    if (error.message.includes('Validation')) {
      setErrorText(error.message.split(':')[1])
    }
  }

  const handleResponse = response => {
    if (response.status === 200) setHasMessage(true)
    if (response.status === 200 && value === '') setHasMessage(false)
  }
  return {
    value,
    updateValue,
    errorText,
    scheduleMessage,
    loading,
    setValue,
  }
}
