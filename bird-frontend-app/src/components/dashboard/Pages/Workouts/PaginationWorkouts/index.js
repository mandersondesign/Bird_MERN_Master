import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'components'
import css from './index.less'

const PaginationWorkouts = ({ page, onChangePagination }) => {
  const { meta = {} } = useSelector(state => state.workouts)

  const renderPagination = meta => (
    <Pagination
      current={page}
      total={meta.totalCount}
      pageSize={meta.limit}
      onChange={onChangePagination}
    />
  )

  return (
    <div className={css.wrapperPaginationWorkouts}>
      {renderPagination(meta?.totalCount ? meta : { totalCount: 1, limit: 10 })}
    </div>
  )
}

export default PaginationWorkouts
