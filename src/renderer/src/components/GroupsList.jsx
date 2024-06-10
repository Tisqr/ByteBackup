import { List, Checkbox } from 'antd'
import PropTypes from 'prop-types'

const GroupsList = ({ data, setActiveListItem, ActiveListItem }) => {
  const handleCheckboxChange = (item, checked) => {
    const updatedList = checked
      ? [...ActiveListItem.List, item]
      : ActiveListItem.List.filter((value) => value !== item)
    setActiveListItem({ ...ActiveListItem, List: updatedList })
  }

  return (
    <div className="list-container">
      <List
        size="small"
        header={<div>File Paths</div>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              checked={ActiveListItem && ActiveListItem.List.includes(item)}
              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
            >
              {item}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  )
}

GroupsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  ActiveListItem: PropTypes.object,
  setActiveListItem: PropTypes.func.isRequired
}

export default GroupsList
