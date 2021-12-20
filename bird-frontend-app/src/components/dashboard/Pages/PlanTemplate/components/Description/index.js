import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'antd'
import css from './index.less'

const { TextArea } = Input

const Description = ({ title = '', description, onSave, placeholder = '', width = '99%' }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(description)
  const inputEdit = useRef(null)

  useEffect(() => {
    if (inputEdit?.current) inputEdit.current.focus()
  }, [isEdit])

  const setEdit = () => setIsEdit(!isEdit)

  const onChange = e => {
    const val = e.target.value

    if (val.split(' ').length < 250) {
      setValue(val)
    } else {
      setValue(val.split(' ').slice(0, 250).join(' '))
    }
  }

  const saveValue = () => {
    onSave(value)
    setEdit()
  }

  return (
    <div className={css.wrapperDescription}>
      <div className={css.title}>{title}</div>

      {isEdit ? (
        <TextArea
          value={value}
          ref={inputEdit}
          placeholder={placeholder}
          onPressEnter={saveValue}
          onBlur={saveValue}
          onChange={onChange}
          className={css.input}
          style={{ maxWidth: width }}
          autoSize
        />
      ) : (
        <div style={{ maxWidth: width }} className={css.description} onClick={setEdit}>{value || placeholder}</div>
      )}
    </div>
  )
}

export default Description
