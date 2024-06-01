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
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }
  ]

  return (
    <div className="table-container" onScroll={handleScroll}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ y: 'calc(100vh - 200px)' }} // Adjust height as needed
      />
    </div>
  )
}

DataTable.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired
    })
  ).isRequired,
  loadMoreData: PropTypes.func.isRequired
}

export default DataTable
