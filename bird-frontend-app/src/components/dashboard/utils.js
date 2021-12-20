import _ from 'lodash'
import { getByRole, formatPhoneNumber } from 'utils'
import React from 'react'
import css from './styles.less'
import { WarningOutlined } from '@ant-design/icons'
import c from 'classnames'
import { Icon } from 'antd'

const searchInput = {
  options: {
    initialValue: '',
  },
  style: {
    width: 210,
    height: 40,
    backgroundColor: '#efeee9',
    borderRadius: 8,
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 1.36,
    letterSpacing: -0.2,
    fontFamily: 'Celias-Regular',
  },
  name: 'search',
  placeholder: 'Search',
  prefix: null,
}

export const prepareSearchInputs = [searchInput]

export const getUserTypeClassName = userType => {
  if (userType === 1) {
    return css.typeAdmin
  }

  if (userType === 2) {
    return css.typeCoach
  }

  if (userType === 3) {
    return css.typeAthlete
  }

  return ''
}

export const getUserTitle = userType => {
  if (userType === 1) {
    return 'Admin'
  }

  if (userType === 2) {
    return 'Coach'
  }

  if (userType === 3) {
    return 'Athlete'
  }

  return ''
}

export const getTypeIcon = type => {
  switch (type) {
    case 1:
      return <div style={{ backgroundColor: '#ECECEC', height: '20px', width: '20px', borderRadius: '50%' }} />
    case 2:
      return <Icon type='check-circle' theme='filled' style={{ color: '#007935', height: '20px', width: '20px', borderRadius: '50%' }} />
    case 3:
      return <Icon type='stop' style={{ color: '#E7440C', height: '20px', width: '20px', borderRadius: '50%' }} />
    case 4:
      return <Icon type='check-circle' style={{ color: 'black', height: '20px', width: '20px', borderRadius: '50%' }} />
    default:
      return
  }
}

const usersColumns = (data = {}, handlers = {}) => [
  {
    title: 'Full Name',
    dataIndex: 'name',
    key: 'name',
    sorter: false,
    className: css.tableColumns,
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
    render: (value, record) => (
      <div className={css.tableRowTd}>
        {[record.firstName, record.lastName].join(' ')}
      </div>
    ),
    admin: true,
    member: true,
    support: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: false,
    className: css.tableColumns,
    sortOrder: data.sorter.columnKey === 'email' && data.sorter.order,
    render: value => (
      <div className={css.tableRowTd}>{_.truncate(value, { length: 170 })}</div>
    ),
    admin: true,
    member: true,
    support: true,
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
    key: 'phone',
    sorter: false,
    className: css.tableColumns,
    sortOrder: data.sorter.columnKey === 'phone' && data.sorter.order,
    render: value => <div className={css.tableRowTd}>{formatPhoneNumber(value) || value || '-'}</div>,
    admin: true,
    member: true,
    support: true,
  },
  {
    title: 'User type',
    dataIndex: 'userTypeId',
    key: 'userTypeId',
    className: c(css.tableColumns, css.doNotBreakWords),
    sorter: false,
    sortOrder: data.sorter.columnKey === 'userType' && data.sorter.order,
    render: value => (
      <div className={[css.typeButton, getUserTypeClassName(value)].join(' ')}>
        {getUserTitle(value)}
      </div>
    ),
    admin: true,
    member: true,
    support: true,
  },
  {
    title: 'User plan',
    dataIndex: 'userPlan',
    key: 'userPlan',
    className: c(css.tableColumns, css.doNotBreakWords),
    sorter: false,
    sortOrder: data.sorter.columnKey === 'userPlan' && data.sorter.order,
    render: (value, record) => (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          {record?.coachPlan?.name}
        </div>
        {record?.coachPlan?.errorMessage && <WarningOutlined style={{ color: 'red', marginTop: '3px' }} />}
      </div>
    ),
    admin: true,
    member: true,
    support: true,
  },
  {
    title: '',
    dataIndex: 'view',
    className: css.tableColumns,
    key: 'view',
    render: (text, record) => handlers.userActions(record),
    admin: true,
    member: false,
    support: false,
  },
]

export const getUsersColumns = (userRole, data = {}, handlers = {}) =>
  getByRole(userRole, usersColumns(data, handlers))

export default getUsersColumns
