import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import css from './styles.less'
import { Select } from '..'
import { arrayByCount, getDaysInMonth, getYears } from './helpers'

const { Option } = Select
const MONTHS = moment.months().map((e, i) => ({ name: e, id: i + 1 }))

export default class DateSelect extends React.Component {
  state = {
    year: getYears()[0],
    month: MONTHS[0],
    day: 1,
  }

  componentWillMount () {
    moment.locale(this.props.locale)
  }

  handleChangeDay = day => {
    const { year, month } = this.state
    this.setState({ day })
    this.props.onChange(moment({ year, month: month.id, day }).format())
  }

  handleChangeMounth = month => {
    const { year, day } = this.state
    const dayInMonth = getDaysInMonth(month, year)
    const getDay = day > dayInMonth ? dayInMonth : day

    this.setState({ month: MONTHS.find(e => e.id === month), day: getDay })
    this.props.onChange(moment({ year, month, day }).format())
  }

  handleChangeYear = year => {
    const { month, day } = this.state
    const dayInMonth = getDaysInMonth(month.id, year)
    const getDay = day > dayInMonth ? dayInMonth : day

    this.setState({ year, day: getDay })
    this.props.onChange(moment({ year, month: month.id, day }).format())
  }

  render () {
    const { yearRange, initialValue } = this.props
    const { year, month, day } = this.state
    const days = getDaysInMonth(month.id, year)

    return (
      <div className={css.root}>
        <Select
          style={{ width: 60 }}
          {...(initialValue ? { value: `${day}` } : {})}
          onChange={this.handleChangeDay}
        >
          {arrayByCount(days).map((e, i) => <Option value={`${e}`} key={i}>{e}</Option>)}
        </Select>
        <Select
          style={{ width: 101 }}
          {...(initialValue ? { value: `${month.id}` } : {})}
          onChange={this.handleChangeMounth}
        >
          {MONTHS.map((e, i) => <Option value={`${e.id}`} key={i}>{e.name}</Option>)}
        </Select>
        <Select
          style={{ width: 78 }}
          {...(initialValue ? { value: `${year}` } : {})}
          onChange={this.handleChangeYear}
        >
          {getYears(yearRange).map((e, i) => <Option value={`${e}`} key={i}>{e}</Option>)}
        </Select>
      </div>
    )
  }
}

DateSelect.propTypes = {
  yearRange: PropTypes.number,
  initialValue: PropTypes.bool,
  onChange: PropTypes.func,
  locale: PropTypes.string,
}

DateSelect.defaultProps = {
  yearRange: 30,
  initialValue: false,
  onChange: () => {},
  locale: 'ru',
}
