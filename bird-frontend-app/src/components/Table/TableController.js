/* eslint-disable react/no-unused-state */
import { Component } from 'react'

export default class TableController extends Component {
  state = {
    pagination: {},
    filters: {},
    sorter: {},

    selectedRowKeys: [],
    selectedData: [],
  };

  get rowSelection () {
    const { selectedRowKeys } = this.state
    return {
      selectedRowKeys,
      onSelect: this.onTableSelectChange,
      onSelectAll: this.onTableSelectAllChange,
    }
  }

  onTableChange = (pagination, filters, sorter) => {
    this.setState({ pagination, filters, sorter })
  };

  onTableSelectChange = (data, selected) => {
    let { selectedRowKeys = [], selectedData = [] } = this.state

    if (selected) {
      selectedRowKeys.push(data.userId)
      selectedData.push(data)
    } else {
      selectedRowKeys = selectedRowKeys.filter(item => item !== data.userId)
      selectedData = selectedData.filter(item => item.userId !== data.userId)
    }

    this.setState({ selectedRowKeys, selectedData })
  };

  onTableSelectAllChange = (selected, selectedRows, changeRows) => {
    let { selectedRowKeys = [], selectedData = [] } = this.state

    if (selected) {
      for (let i = 0; i < changeRows.length; i += 1) {
        selectedRowKeys.push(changeRows[i].userId)
        selectedData.push(changeRows[i])
      }
    } else {
      const deletedRowsIds = changeRows.map(e => e.userId)

      selectedRowKeys = selectedRowKeys.filter(item => deletedRowsIds.indexOf(item) === -1)
      selectedData = selectedData.filter(item => deletedRowsIds.indexOf(item.userId) === -1)
    }
    this.setState({ selectedRowKeys, selectedData })
  };
}
