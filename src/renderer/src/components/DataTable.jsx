import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import PropTypes from 'prop-types'

const DataTable = ({ Data, setData, ActiveItem }) => {
  const handleDelete = (item) => {
    let updatedData = [...Data]

    updatedData = updatedData.map((group) => {
      if (group.name === ActiveItem) {
        return {
          ...group,
          TableData: group.TableData.filter((table) => table.path !== item.path)
        }
      }
      return group
    })
    setData(updatedData)
  }

  return (
    <div className="list-container">
      <List
        size="small"
        header={ActiveItem ? ActiveItem : 'No Group Selected'}
        dataSource={Data.find((item) => item.name === ActiveItem)?.TableData || []}
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
  Data: PropTypes.array,
  setData: PropTypes.func.isRequired,
  ActiveItem: PropTypes.string
}

export default DataTable
