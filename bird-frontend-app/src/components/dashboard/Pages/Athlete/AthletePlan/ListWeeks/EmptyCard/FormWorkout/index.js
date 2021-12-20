import React, { useState } from 'react'
import { Icon } from 'antd'
import FromLibrary from './FromLibrary'
import NewWorkout from './NewWorkout'
import css from './index.less'

const FormWorkout = ({ workout, setEdit, updateVisible }) => {
  const [page = 'newWorkout', setPage] = useState()

  const funcEdit = () => {
    setEdit()
    setPage('newWorkout')
  }

  const funcVisible = () => {
    updateVisible()
    setPage('newWorkout')
  }

  const attr = { workout, setEdit: funcEdit, updateVisible: funcVisible }

  const title = workout?.workoutId ? 'Edit Workout' : 'Add New Workout'

  const obj = {
    newWorkout: () => <NewWorkout {...attr} />,
    fromLibrary: () => <FromLibrary {...attr} />,
  }

  return (
    <div className={css.formWorkout}>
      <div className={css.header}>
        <div className={css.btns}>
          <span onClick={() => setPage('newWorkout')} className={page === 'newWorkout' ? css.activeItemMenu : css.itemMenu}>{title}</span>
          <span onClick={() => setPage('fromLibrary')} className={page === 'fromLibrary' ? css.activeItemMenu : css.itemMenu}>Add From Library</span>
        </div>

        <Icon type='close' className={css.iconClose} onClick={setEdit || updateVisible} />
      </div>

      <div className={css.body}>
        {obj[page]?.() || obj.newWorkout()}
      </div>
    </div>
  )
}

export default FormWorkout
