import { Input, Button, Tooltip } from 'antd'
import { PlusOutlined, CheckOutlined, DeleteOutlined, ToolOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Search } = Input

const Header = ({ BackupLoc, setBackupLoc, BackupFunc, showModal, DeleteItem }) => {
  const handleInputChange = (e) => {
    setBackupLoc(e.target.value)
  }

  return (
    <>
      <div className="header">
        <Search placeholder="Search..." enterButton />
        <Tooltip title="Delete">
          <Button
            type="primary"
            onClick={DeleteItem} // works
            shape="default"
            icon={<DeleteOutlined />}
          />
        </Tooltip>
        <Tooltip title="New">
          <Button type="primary" onClick={showModal} shape="default" icon={<PlusOutlined />} />
        </Tooltip>
        <Tooltip title="Backup">
          <Button type="primary" onClick={BackupFunc} shape="default" icon={<CheckOutlined />} />
        </Tooltip>
      </div>
      <div>
        <Input
          placeholder="Enter Backup Location (e.g., /path/to/backup)"
          value={BackupLoc} // Use value instead of defaultValue
          onChange={handleInputChange} // Add onChange handler
        />
      </div>
    </>
  )
}

Header.propTypes = {
  BackupFunc: PropTypes.func,
  BackupLoc: PropTypes.string,
  setBackupLoc: PropTypes.func, // Add the setter function prop type
  showModal: PropTypes.func,
  DeleteItem: PropTypes.func
}

export default Header
