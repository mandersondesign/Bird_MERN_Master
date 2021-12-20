import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { librarySelector } from 'modules/library/library-selectors'
import { updatePlan } from 'modules/library/library-actions'
import { Tooltip, EcoForm, EcoFormInput } from 'components'
import { Icon } from 'components/CustomIcon'
import css from './index.less'

const HeaderTemplate = ({ library: { planTemplate }, updatePlan }) => {
  const [editText, setEeditText] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const inputEdit = useRef(null)

  useEffect(() => {
    if (planTemplate?.planTemplateId) setEeditText(planTemplate.name)
  }, [planTemplate])

  useEffect(() => {
    if (isEdit) inputEdit.current.focus()
  }, [isEdit])

  const clickEdit = () => setIsEdit(!isEdit)

  const onChange = e => setEeditText(e.target.value)

  const onSubmit = e => {
    const { name } = e.fields

    if (editText === planTemplate.name) {
      clickEdit()
      return
    }

    if (!e.errors) {
      updatePlan(planTemplate.planTemplateId, { name }).then(res => {
        if (res) clickEdit()
      })
    }
  }

  const onBlur = e => {
    if (editText === planTemplate.name) {
      clickEdit()
      return
    }

    if (editText) {
      updatePlan(planTemplate.planTemplateId, { name: editText }).then(res => {
        if (res) clickEdit()
      })
    }
  }

  return isEdit ? (
    <EcoForm onSubmit={onSubmit}>
      <EcoFormInput
        options={{
          rules: [{ required: true, whitespace: true, message: 'Name can not be empty.' }],
          validateTrigger: ['onBlur', 'onPressEnter'],
          initialValue: editText,
        }}
        autoComplete='off'
        onChange={onChange}
        className={css.inputEdit}
        name='name'
        refFocus={inputEdit}
        onBlur={onBlur}
      />
    </EcoForm>
  ) : (
    <div className={css.rootHeader}>
      <span>{editText}</span>
      <Tooltip title='EDIT' content={<Icon onClick={clickEdit} type='edit' size='medium' className={css.icon} />} />
    </div>
  )
}

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  updatePlan: (planId, data) => dispatch(updatePlan(planId, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate)
