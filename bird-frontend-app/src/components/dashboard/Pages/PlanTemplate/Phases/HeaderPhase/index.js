import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { librarySelector } from 'modules/library/library-selectors'
import { updatePhase, delPhase, getPlanTemplate } from 'modules/library/library-actions'
import { Icon } from 'components/CustomIcon'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Tooltip, Input } from 'components'
import { Popconfirm, notification } from 'antd'
import ImgDrag from '../drag_24x24.svg'
import css from './index.less'

const HeaderPhase = props => {
  const { dragHandleProps, phase, updatePhase, delPhase, open, getPlanTemplate, library: { planTemplate: { planTemplateId } } } = props
  const { name = '', planPhaseTemplateId, numberOfPhase } = phase

  const [value = name, setValue] = useState()
  const [isName, setIsName] = useState(false)
  const inputEdit = useRef(null)

  const question = 'Are you sure you want to delete this phase?'

  useEffect(() => {
    if (isName) inputEdit.current.focus()
  }, [isName])

  const clickEdit = event => {
    event && stopCollapse(event)
    setIsName(!isName)
  }

  const onChange = e => setValue(e.target.value)

  const saveValue = async () => {
    const val = value.trim()

    if (val.length) {
      const data = { name: value, description: '', numberOfPhase }
      clickEdit()
      await updatePhase(planTemplateId, planPhaseTemplateId, data)
      getPlanTemplate(planTemplateId)
    } else {
      notification.error({ message: 'Field can not be empty' })
    }
  }

  const deletePhase = async event => {
    stopCollapse(event)
    await delPhase(planTemplateId, planPhaseTemplateId)
    getPlanTemplate(planTemplateId)
  }

  const stopCollapse = event => event.stopPropagation()

  return (
    <div className={css.headerCollapse}>
      <div {...dragHandleProps} className={css.wrapperIcon}>
        <ImgDrag onClick={stopCollapse} />
      </div>
      {isName ? (
        <Input
          value={value}
          onChange={onChange}
          onBlur={saveValue}
          onClick={stopCollapse}
          onPressEnter={saveValue}
          className={css.inputValue}
          ref={inputEdit}
        />
      ) : (
        <div className={css.wrapperHeaderCollapse}>
          <div className={css.headerCollapse}>
            <div className={css.nameText}>{value}</div>
            <Tooltip className={css.wrapperIcon} title='EDIT' content={<Icon onClick={clickEdit} type='edit' size='medium' className={css.icon} />} />
            <Popconfirm onClick={stopCollapse} className={css.iconDel} title={question} okText='Yes' cancelText='No' onConfirm={deletePhase} onCancel={stopCollapse}>
              <Tooltip className={css.wrapperIcon} title='DELETE' content={<Icon type='trash' size='medium' className={css.icon} />} />
            </Popconfirm>
          </div>

          {open ? <UpOutlined /> : <DownOutlined />}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  updatePhase: (planId, phaseId, data) => dispatch(updatePhase(planId, phaseId, data)),
  delPhase: (planId, phaseId) => dispatch(delPhase(planId, phaseId)),
  getPlanTemplate: id => dispatch(getPlanTemplate(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPhase)
