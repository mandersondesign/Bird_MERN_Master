import { useState } from 'react'

const SUGGESTION_ERROR = 'SUGGESTION'
const TEXT_ERROR = 'TEXTBOX'
const BAD_REQUEST = '400'

export const useModalValidation = ({ autocompleteValue, textBoxValue }) => {
  const [autocompleteError, setAutocompleteError] = useState(false)
  const [autoErrorMessage, setAutoErrorMessage] = useState(false)
  const [textBoxError, setTextBoxError] = useState('')
  const [boxErrorMessage, setBoxErrorMessage] = useState('')

  const handleModalError = error => {
    if (error.includes(SUGGESTION_ERROR)) {
      setAutocompleteError(true)
      setAutoErrorMessage('Please select Athletes or Plans to send message to.')
    }
    if (error.includes(TEXT_ERROR)) {
      setTextBoxError(true)
      setBoxErrorMessage('Please type a message to send your users.')
    }
    if (error.includes(BAD_REQUEST)) {
      setTextBoxError(true)
      setBoxErrorMessage('Internal problem. Please try again Later.')
    }
  }

  const validateModal = () => {
    if (autocompleteValue.length === 0) {
      throw new Error(
        `${SUGGESTION_ERROR} - Please select a user or Plan you would like to send messages to.`,
      )
    }
    if (textBoxValue === '') {
      throw new Error(
        `${TEXT_ERROR} - Please type the message you want to send your athletes.`,
      )
    }
  }

  return {
    handleModalError,
    validateModal,
    autocompleteError,
    autoErrorMessage,
    setAutoErrorMessage,
    setAutocompleteError,
    textBoxError,
    setTextBoxError,
    boxErrorMessage,
    setBoxErrorMessage,
  }
}
