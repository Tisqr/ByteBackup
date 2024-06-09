import { List } from 'antd'
import PropTypes from 'prop-types'

const GroupsList = ({ data, setActiveListItem }) => {
  const handleActiveItemChange = (item) => {
    setActiveListItem(['list', item])
  }
  return (
    <div className="list-container">
      <List
        size="small"
        header={<div>File Paths</div>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href="#" onClick={() => handleActiveItemChange(item)}>
                  {item}
                </a>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

GroupsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  ActiveListItem: PropTypes.array,
  setActiveListItem: PropTypes.func.isRequired
}

export default GroupsList
