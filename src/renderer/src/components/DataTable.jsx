import { Table } from 'antd'
import PropTypes from 'prop-types'

const DataTable = ({ dataSource, loadMoreData }) => {
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
      key: 'path'
    }
    // {
    //   title: 'Exclude',
    //   dataIndex: 'exclude',
    //   key: 'exclude'
    // }
  ]

  return (
    <div className="table-container" onScroll={handleScroll}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: 'calc(100vh - 100px)' }} // Adjust height as needed
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
  loadMoreData: PropTypes.func
}

export default DataTable
