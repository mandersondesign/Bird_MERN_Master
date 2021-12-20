import { useState } from 'react'
import { messages } from 'api'

export const useSwitch = athlete => {
  const [checked, setChecked] = useState(athlete.isSmsEnabled)
  const [loading, setLoading] = useState(false)
  const toggleSwitch = async value => {
    try {
      setLoading(true)
      const body = {
        isSmsEnabled: value,
      }
      await messages.toggleSms(athlete.userId, body)
      setLoading(false)
      setChecked(value)
    } catch (error) {
      setLoading(false)
    }
  }

  return {
    checked,
    toggleSwitch,
    loading,
  }
}
