import { List } from 'antd'
import PropTypes from 'prop-types'

const GroupsList = ({ data }) => {
  return (
    <div className="list-container">
      <List
        size="small"
        header={<div>File Paths</div>}
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}

GroupsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default GroupsList
