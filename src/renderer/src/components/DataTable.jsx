import { Table } from 'antd'
import PropTypes from 'prop-types'

const DataTable = ({ dataSource, loadMoreData, setActiveTableItem }) => {
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreData()
    }
  }

  const handleRowClick = (record) => {
    setActiveTableItem(['table', record.path])
  }

  const columns = [
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      render: (text, record) => (
        <a href="#" onClick={() => handleRowClick(record)}>
          {text}
        </a>
      )
    }
  ]

  return (
    <div className="table-container" onScroll={handleScroll}>
      <Table
        dataSource={[...dataSource]}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: 'calc(100vh - 200px)' }} // Adjust height as needed
        onRow={(record) => ({
          onClick: () => handleRowClick(record)
        })}
      />
    </div>
  )
}

DataTable.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  loadMoreData: PropTypes.func,
  setActiveTableItem: PropTypes.func.isRequired
}

export default DataTable
