import { useState } from 'react'

export const useSnack = () => {
  const [openSnack, setOpenSnack] = useState(false)
  const handleCloseSnack = () => {
    setOpenSnack(false)
  }
  return {
    openSnack,
    setOpenSnack,
    handleCloseSnack,
  }
}
