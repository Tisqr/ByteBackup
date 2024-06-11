import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import PropTypes from 'prop-types'

const DataTable = ({ dataSource, setDataSource }) => {
  const handleDelete = (item) => {
    const updatedData = dataSource.filter((dataItem) => dataItem.key !== item.key)
    setDataSource(updatedData)
  }

  return (
    <div className="list-container">
      <List
        size="small"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <div>{item.path}</div>
            <div>
              <a href="#" onClick={() => handleDelete(item)}>
                <DeleteOutlined />
              </a>
            </div>
          </List.Item>
        )}
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
  setDataSource: PropTypes.func.isRequired
}

export default DataTable
