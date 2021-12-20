import React, { useState } from 'react'
import { Icon } from 'antd'
import FromLibrary from './FromLibrary'
import NewWorkout from './NewWorkout'
import css from './index.less'

const FormWorkout = ({
  workout,
  setEdit,
  updateVisible,
  onSubmit,
  popupForLibrary = false,
  popupForLibraryEdit = false,
  workoutFromLibrary,
  resetSort = () => { },
  descriptionForLinks = false,
  setFlagDescriptionForLinks = () => { },
}) => {
  const [page = 'newWorkout', setPage] = useState()

  const funcEdit = () => {
    setEdit()
    setPage('newWorkout')
  }

  const funcVisible = () => {
    updateVisible()
    setPage('newWorkout')
  }

  const funcSubmit = (e, form, updateVisible, customType, setCustomType, choosenWorkout) => {
    onSubmit(e, form, funcVisible, customType, setCustomType, choosenWorkout)
  }

  const attr = {
    workout,
    resetSort,
    setEdit: funcEdit,
    updateVisible: funcVisible,
    onSubmit: funcSubmit,
    popupForLibrary,
    popupForLibraryEdit,
    workoutFromLibrary,
    descriptionForLinks,
    setFlagDescriptionForLinks,
  }

  const title = (workoutFromLibrary?.workoutLibraryId || workout?.workoutId || workout?.workoutTemplateId) ? 'Edit Workout' : 'Add New Workout'

  const obj = {
    newWorkout: () => <NewWorkout {...attr} />,
    fromLibrary: () => <FromLibrary {...attr} />,
  }

  return (
    <div className={css.formWorkout}>
      <div className={css.header}>
        <div className={css.btns}>
          {popupForLibrary
            ? <span onClick={() => setPage('newWorkout')} className={page === 'newWorkout' ? css.activeItemMenu : css.itemMenu}>{title}</span>
            : (
              <>
                <span onClick={() => setPage('newWorkout')} className={page === 'newWorkout' ? css.activeItemMenu : css.itemMenu}>{title}</span>
                <span onClick={() => setPage('fromLibrary')} className={page === 'fromLibrary' ? css.activeItemMenu : css.itemMenu}>Add From Library</span>
              </>
            )}
        </div>

        <Icon type='close' className={css.iconClose} onClick={updateVisible} />
      </div>

      <div className={css.body}>
        {obj[page]?.() || obj.newWorkout()}
      </div>
    </div>
  )
}

export default FormWorkout
