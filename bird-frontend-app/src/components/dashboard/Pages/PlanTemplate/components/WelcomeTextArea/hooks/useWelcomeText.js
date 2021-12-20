import { useState } from 'react'
import { library } from 'api'

export const useWelcomeText = planTemplate => {
  const [areaValue, setAreaValue] = useState(
    planTemplate?.scheduledMessage || '',
  )

  const updateAreaValue = event => {
    setAreaValue(event.target.value)
  }

  const sendWelcomeText = async () => {
    try {
      const { name, planTemplateId } = planTemplate
      const body = {
        name,
        message: areaValue,
      }
      await library.updatePlan(planTemplateId, body)
    } catch (error) {}
  }

  return {
    areaValue,
    setAreaValue,
    updateAreaValue,
    sendWelcomeText,
  }
}
