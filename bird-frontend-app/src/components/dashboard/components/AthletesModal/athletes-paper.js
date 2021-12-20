import React from 'react'

import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Alert } from '@material-ui/lab'

import {
  BodyDialog,
  ButtonContainer,
  ContentDialog,
  HeaderDialog,
  HeaderTitle,
  TextBox,
  CustomButton,
  Loading,
  ErrorMessage,
} from './modal-styled'
import { AthletesAutocomplete } from './athletes-autocomplete'
import { useAthletesModal } from './hooks/useAthletesModal'
import { GREY_SNOW, YELLOW } from '../../../../styles/variables'

const AthletesPaper = ({ closeModal }) => {
  const {
    changeAutocomplete,
    autocompleteValue,
    autocompleteError,
    autoErrorMessage,
    changeTextBox,
    textBoxValue,
    textBoxError,
    boxErrorMessage,
    autocompleteOptions,
    sendMessage,
    openSnack,
    handleCloseSnack,
    isSending,
  } = useAthletesModal(closeModal)

  return (
    <ContentDialog>
      <HeaderDialog>
        <HeaderTitle>New Message</HeaderTitle>
        <IconButton
          style={{ color: 'white' }}
          size='small'
          onClick={closeModal}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </HeaderDialog>
      <BodyDialog>
        <AthletesAutocomplete
          autocompleteOptions={autocompleteOptions}
          changeAutocomplete={changeAutocomplete}
          autocompleteValue={autocompleteValue}
          autocompleteError={autocompleteError}
        />
        <ErrorMessage>{autoErrorMessage}</ErrorMessage>
        <TextBox
          error={textBoxError}
          value={textBoxValue}
          onChange={changeTextBox}
        />
        <ErrorMessage isBox>{boxErrorMessage}</ErrorMessage>
        <ButtonContainer>
          <CustomButton backgroundColor={YELLOW} onClick={sendMessage}>
            {isSending ? <Loading size={20} /> : 'SEND'}
          </CustomButton>
          <CustomButton backgroundColor={GREY_SNOW} onClick={closeModal}>
            CANCEL
          </CustomButton>
        </ButtonContainer>
      </BodyDialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity='success'>
          Your message was successfully send to users.
        </Alert>
      </Snackbar>
    </ContentDialog>
  )
}

export default AthletesPaper
