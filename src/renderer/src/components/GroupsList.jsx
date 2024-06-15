import { List } from 'antd'
import PropTypes from 'prop-types'
import { DeleteOutlined } from '@ant-design/icons'

const GroupsList = ({ Data, ActiveItem, setActiveItem, setData }) => {
  const handleDelete = (e) => {
    let target = e.target.parentNode.parentNode.parentNode.parentNode.firstChild.textContent
    let initialData = [...Data]
    initialData = initialData.filter((item) => item.name !== target)
    if (target == ActiveItem) {
      setActiveItem('')
    }
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
        dataSource={Data}
        renderItem={(item) => (
          <List.Item>
            <div>
              <a href="#" onClick={handleActiveItemChange}>
                {item.name}
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
  setActiveItem: PropTypes.func.isRequired,
  ActiveItem: PropTypes.string
}

export default GroupsList
