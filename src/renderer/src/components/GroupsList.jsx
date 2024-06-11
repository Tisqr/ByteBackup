import { List } from 'antd'
import PropTypes from 'prop-types'
import { DeleteOutlined } from '@ant-design/icons'

const GroupsList = ({ data, ListDataSource, setListDataSource }) => {
  const handleDelete = (e) => {
    console.log('deleting')
    let initialData = ListDataSource
    initialData = initialData.filter(
      (item) => item !== e.target.parentNode.parentNode.parentNode.parentNode.firstChild.textContent
    )
    setListDataSource(initialData)
  }

  return (
    <div className="list-container">
      <List
        size="small"
        header={<div>Groups</div>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div>{item}</div>
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
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  ListDataSource: PropTypes.array,
  setListDataSource: PropTypes.func.isRequired
}

export default GroupsList
