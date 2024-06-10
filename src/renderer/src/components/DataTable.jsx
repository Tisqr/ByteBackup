import { Table } from 'antd'
import PropTypes from 'prop-types'

const DataTable = ({ dataSource, loadMoreData, setActiveTableItem, ActiveItem }) => {
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreData()
    }
  }

  const columns = [
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      render: (text) => <p>{text}</p>
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setActiveTableItem({ ...ActiveItem, Table: selectedRows })
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      key: record.key // Use key instead of path
    })
  }

  return (
    <div className="table-container" onScroll={handleScroll}>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: 'calc(100vh - 200px)' }} // Adjust height as needed
      />
    </div>
  )
}

DataTable.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired, // Ensure key is present in the dataSource
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  loadMoreData: PropTypes.func,
  setActiveTableItem: PropTypes.func.isRequired,
  ActiveItem: PropTypes.object
}

export default DataTable
