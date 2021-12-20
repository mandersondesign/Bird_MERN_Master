import React from 'react'
import PropTypes from 'prop-types'
import { AutoComplete as AntAutoComplete } from 'antd'
import Input from '../Input'
import css from './styles.less'

class AutoComplete extends React.Component {
  state = {
    visibility: 'visible',
  }

  filter = (inputVal, option) => option.props.children.toUpperCase().indexOf(inputVal.toUpperCase()) !== -1;

  render () {
    const { filter, fieldName, className, ...props } = this.props
    const { visibility } = this.state

    return (
      <div className={className}>
        <div style={{ visibility }} className={css.fieldName}>
          {fieldName}
        </div>
        <AntAutoComplete
          {...props}
          className={css.autoComplite}
          // onSearch={this.handleSearch}
          filterOption={filter ? this.filter : false}
        >
          <Input placeholder={fieldName} />
        </AntAutoComplete>
      </div>
    )
  }
}

AutoComplete.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.array,
  filter: PropTypes.bool,
  fieldName: PropTypes.string,
  onSelect: PropTypes.func,
}

AutoComplete.defaultProps = {
  className: '',
  dataSource: [],
  filter: true,
  fieldName: '',
  onSelect: () => {},
}

export default AutoComplete
