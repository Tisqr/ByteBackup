import { Input, Button, Tooltip } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import '../assets/OptionTab.css' // Import the CSS file for styling

const OptionTab = ({ BackupFunc, BackupLoc, setBackupLoc }) => {
  const handleInputChange = (e) => {
    setBackupLoc(e.target.value)
  }

  return (
    <div className="option-tab-container">
      <Input
        placeholder="Enter Backup Location (e.g., /path/to/backup)"
        value={BackupLoc} // Use value instead of defaultValue
        onChange={handleInputChange} // Add onChange handler
        className="backup-input" // Add a class for styling
      />
      <Tooltip title="Backup">
        <Button
          type="primary"
          onClick={BackupFunc}
          shape="default"
          icon={<CheckOutlined />}
          className="backup-button"
        />
      </Tooltip>
    </div>
  )
}

OptionTab.propTypes = {
  BackupLoc: PropTypes.string,
  setBackupLoc: PropTypes.func, // Add the setter function prop type
  BackupFunc: PropTypes.func
}

export default OptionTab
