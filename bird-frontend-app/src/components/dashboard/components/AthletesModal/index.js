import React from 'react'
import AthletesPaper from './athletes-paper'

import { CenteredDialog } from './modal-styled'

const AthletesModal = ({ isModalVisible = false, closeModal }) => {
  return (
    <CenteredDialog
      PaperComponent={() => <AthletesPaper closeModal={closeModal} />}
      open={isModalVisible}
      onClose={closeModal}
      maxWidth='lg'
      aria-labelledby='form-dialog-title'
    />
  )
}

export default React.memo(AthletesModal)
