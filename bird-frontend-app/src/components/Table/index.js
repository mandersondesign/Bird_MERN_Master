import React from 'react'
import { Table as AntTable } from 'antd'
import { func, bool } from 'prop-types'
import bem from 'utils/bem'
import TableController from './TableController'
import './Table.scss'

export const TablePropTypes = {
  customColumns: func,
  rowClassName: func,
  withRowSelection: bool,
}

export const TableDefaultProps = {
  withRowSelection: false,
  customColumns: () => [],
}

export default class Table extends TableController {
  static propTypes = TablePropTypes;

  static defaultProps = TableDefaultProps;

  static className = 'Table';

  get columns () {
    const { sorter } = this.state
    const { customColumns } = this.props
    return customColumns({ sorter })
  }

  render () {
    const { withRowSelection, dataSource, rowClassName, ...props } = this.props
    return (
      <div className={bem.block(this)}>
        <AntTable
          dataSource={dataSource}
          rowKey={o => o.userId}
          onChange={this.onTableChange}
          pagination={dataSource?.length > 10}
          rowSelection={withRowSelection ? this.rowSelection : undefined}
          columns={this.columns}
          rowClassName={rowClassName}
          {...props}
        />
      </div>
    )
  }
}
