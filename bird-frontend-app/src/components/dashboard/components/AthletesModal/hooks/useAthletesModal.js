import { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { coaches, plans as plansApi, messages } from 'api'
import { sideNavSelector } from 'modules/sidenav/sidenav-selectors'
import { useModalValidation } from './useModalValidation'
import { useSnack } from './useSnack'

const SUGGESTED_ATHLETES = 'SUGGESTED ATHLETES'
const SUGGESTED_GROUPS = 'SUGGESTED GROUPS'

export const useAthletesModal = closeModal => {
  const [autocompleteValue, setAutocompleteValue] = useState([])
  const [textBoxValue, setTextBoxValue] = useState('')
  const [isSending, setIsSending] = useState(false)

  const {
    textBoxError,
    setTextBoxError,
    autocompleteError,
    autoErrorMessage,
    setAutocompleteError,
    setAutoErrorMessage,
    handleModalError,
    validateModal,
    boxErrorMessage,
    setBoxErrorMessage,
  } = useModalValidation({
    autocompleteValue,
    textBoxValue,
  })
  const { openSnack, handleCloseSnack, setOpenSnack } = useSnack()
  const {
    items: { plans, athletes },
  } = useSelector(sideNavSelector)
  const totalAmount = athletes[0].amount
  const changeAutocomplete = useCallback(
    value => {
      setAutocompleteError(false)
      setAutoErrorMessage('')
      setAutocompleteValue(value)
    },
    [setAutocompleteValue],
  )
  const changeTextBox = useCallback(
    event => {
      setTextBoxError(false)
      setBoxErrorMessage('')
      setTextBoxValue(event.target.value)
    },
    [setTextBoxValue],
  )
  const [autocompleteOptions, setAutocompleteOptions] = useState([])

  useEffect(() => {
    const fetchAthletesAndPlans = async () => {
      const athletesData = await coaches.getAllAthletes({
        limit: totalAmount,
      })
      const allActiveAthletes = athletesData.data.athletes
        .filter(athlete => athlete.plan && athlete.isActive)
        .map(athlete => ({
          ...athlete,
          suggestion: SUGGESTED_ATHLETES,
        }))
      setAutocompleteOptions([
        ...plans.map(plan => ({
          ...plan,
          suggestion: SUGGESTED_GROUPS,
        })),
        ...allActiveAthletes,
      ])
    }
    fetchAthletesAndPlans()
  }, [])

  const sendMessage = async () => {
    setIsSending(true)
    const selectedAthletes = autocompleteValue.filter(
      option => option.suggestion === SUGGESTED_ATHLETES,
    )
    const selectedPlans = autocompleteValue.filter(
      option => option.suggestion === SUGGESTED_GROUPS,
    )
    try {
      validateModal()
      const { planUsers } = await getPlanUsers(selectedPlans)
      const { validUsers } = removeDuplicate(selectedAthletes, planUsers)

      await messages.sendMessageGroup({
        users: [...validUsers, ...planUsers],
        message: textBoxValue,
        plan_ids: [],
      })

      setOpenSnack(true)
      setIsSending(false)
      closeModal()
    } catch (error) {
      handleModalError(error.toString())
      setIsSending(false)
    }
  }

  const getPlanUsers = async selectedPlans => {
    const templatePromises = selectedPlans.map(selectedPlan =>
      plansApi.getTemplateAthletes({
        id: selectedPlan.planTemplateId,
        limit: totalAmount,
      }),
    )
    const templateResponses = await Promise.all(templatePromises)

    const templateUsers = []
    templateResponses.forEach(response => {
      response.data.athletes.forEach(athlete => {
        templateUsers.push(athlete)
      })
    })
    const planUsers = autocompleteOptions
      .filter(
        option =>
          option.suggestion === SUGGESTED_ATHLETES &&
          templateUsers.find(
            user => user.userId === option.userId && user.isSmsEnabled,
          ),
      )
      .map(user => ({ userId: user.userId, planId: user.plan.planId }))
    return {
      planUsers,
    }
  }

  const removeDuplicate = (selectedAthletes, planUsers) => {
    const planIds = planUsers.map(user => user.planId)
    const validUsers = selectedAthletes
      .filter(athlete => !planIds.includes(athlete.plan.planId))
      .map(athlete => ({
        userId: athlete.userId,
        planId: athlete.plan.planId,
      }))
    return {
      validUsers,
    }
  }

  return {
    autocompleteValue,
    changeAutocomplete,
    textBoxValue,
    changeTextBox,
    autocompleteOptions,
    sendMessage,
    textBoxError,
    autocompleteError,
    openSnack,
    handleCloseSnack,
    isSending,
    autoErrorMessage,
    boxErrorMessage,
  }
}
