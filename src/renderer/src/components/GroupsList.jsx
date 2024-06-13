import { List } from 'antd'
import PropTypes from 'prop-types'
import { DeleteOutlined } from '@ant-design/icons'

const GroupsList = ({ Data, setActiveItem, ListDataSource, setData }) => {
  const handleDelete = (e) => {
    let initialData = [...Data]
    initialData = initialData.filter(
      (item) =>
        item.name !== e.target.parentNode.parentNode.parentNode.parentNode.firstChild.textContent
    )
    setData(initialData)
  }

  const handleActiveItemChange = (e) => {
    setActiveItem(e.target.textContent)
  }

  return (
    <div className="list-container">
      <List
        size="small"
        header={<div>Groups</div>}
        dataSource={ListDataSource}
        renderItem={(item) => (
          <List.Item>
            <div>
              <a href="#" onClick={handleActiveItemChange}>
                {item}
              </a>
            </div>
            <div>
              <a onClick={handleDelete}>
                <DeleteOutlined />
              </a>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

GroupsList.propTypes = {
  Data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  ListDataSource: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired
}

export default GroupsList
