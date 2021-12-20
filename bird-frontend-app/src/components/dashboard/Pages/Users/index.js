import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'components'
import { Header } from '../../components'
import {
  EcoForm,
  Table,
  Icon,
  Pagination,
  EcoFormInput,
} from 'components/index'
import usersColumns, { prepareSearchInputs } from 'components/dashboard/utils'
import { getUsers } from 'modules/users/users-actions'
import { debounce } from 'lodash'
import css from './index.less'

const Users = props => {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({})
  const dispatch = useDispatch()

  const {
    users: { users },
    logAsCoach,
  } = props

  useEffect(() => {
    if (users?.length) {
      setLoading(false)
    } else {
      dispatch(getUsers(page, query)).then(res => {
        setMeta(res?.meta)
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    dispatch(getUsers(page, query)).then(res => {
      setMeta(res?.meta)
      setLoading(false)
    })
  }, [users?.length])

  const onSearch = e => {
    const q = e.target.value.toString()
    setLoading(true)
    setQuery(q)

    dispatch(getUsers(page, q)).then(res => {
      setMeta(res?.meta)
      setLoading(false)
    })
  }

  const logCoach = async id => {
    await logAsCoach(id)
  }

  const userActions = record => (
    <div className={css.wrapperActions}>
      {record.userTypeId === 2 && (
        <NavLink className={css.icon} to='#'>
          <Icon
            svg
            size={20}
            height={21}
            width={20}
            type='uploadCustom'
            color='#3831ff'
          />
          <div className={css.text} onClick={() => logCoach(record.userId)}>
            Sign in as
          </div>
        </NavLink>
      )}
      <NavLink className={css.icon} to={`/user/${record.userId}/edit`}>
        <Icon svg size={20} type='editCustom' color='#3831ff' />
        <div className={css.text}>Edit</div>
      </NavLink>
    </div>
  )

  const onChangePagination = debounce(page => {
    setLoading(true)
    dispatch(getUsers(page, query)).then(() => setLoading(false))
    window.scrollTo(0, 0)
    setPage(page)
  }, 250)

  const renderPagination = meta => (
    <Pagination
      current={page}
      total={meta.totalCount}
      pageSize={meta.limit}
      onChange={onChangePagination}
    />
  )

  const renderInput = (props, i) => <EcoFormInput key={i} {...props} />

  const columns = usersColumns(
    { userTypeId: 1, name: 'Admin' },
    { sorter: [] },
    { userActions },
  )

  return (
    <div className={css.wrapperUsers}>
      <Header title='My Athletes' admin />
      <div className={css.header}>
        <div className={css.rootTitle}>Users</div>
        <EcoForm className={css.form} onChange={onSearch}>
          {prepareSearchInputs.map(renderInput)}
        </EcoForm>
        <NavLink to='/user/create' className={css.button}>
          CREATE USER
        </NavLink>
      </div>

      <div className={css.wrapperTable}>
        <Table
          loading={loading}
          locale={{
            emptyText:
              users && users?.length === 0 ? 'No data' : 'No results found',
          }}
          columns={columns}
          dataSource={users || []}
          rowKey={record => record.userId}
          pagination={false}
        />

        <div className={css.pagination}>
          {renderPagination(
            meta?.totalCount ? meta : { totalCount: 1, limit: 10 },
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
