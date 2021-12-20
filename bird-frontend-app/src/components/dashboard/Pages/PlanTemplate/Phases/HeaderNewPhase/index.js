import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { librarySelector } from 'modules/library/library-selectors'
import { addNewPhases, getPlanTemplate } from 'modules/library/library-actions'
import { Input } from 'components'
import { Spin, notification } from 'antd'
import css from './index.less'

const HeaderNewPhase = ({ library: { planTemplate, isNewPhase, namesOfPhases }, addNewPhases, getPlanTemplate }) => {
  const [isAdd, setIsAdd] = useState(true)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const inputEdit = useRef(null)

  const { planTemplateId } = planTemplate

  useEffect(() => {
    if (inputEdit) inputEdit.current.focus()
  }, [])

  const onChange = e => setValue(e.target.value)

  const saveValue = async event => {
    const val = value.trim()

    if (val.length) {
      setLoading(true)
      setIsAdd(false)
      if (isAdd) {
        await addNewPhases(namesOfPhases, planTemplateId, { name: val })
      }
      await getPlanTemplate(planTemplateId)
      setLoading(false)
    } else {
      notification.error({ message: 'Field can not be empty' })
    }
  }

  const stopCollapse = event => event.stopPropagation()

  return (
    <div className={css.wrapperHeaderNewPhase} onClick={stopCollapse}>
      <Input
        value={value}
        onChange={onChange}
        onBlur={saveValue}
        onPressEnter={saveValue}
        onClick={stopCollapse}
        className={css.inputValue}
        ref={inputEdit}
      />
      {loading && <Spin />}
    </div>
  )
}

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  getPlanTemplate: planId => dispatch(getPlanTemplate(planId)),
  addNewPhases: (namesOfPhases, planId, data) => dispatch(addNewPhases(namesOfPhases, planId, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNewPhase)
