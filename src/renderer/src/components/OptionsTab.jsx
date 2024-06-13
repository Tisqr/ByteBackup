import { Input, Button, Tooltip } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import '../assets/OptionTab.css'

const OptionTab = ({ Data, setData, ActiveItem, BackupFunc }) => {
  const handleInputChange = (e) => {
    const newData = Data.map((item) => {
      if (item.name === ActiveItem) {
        return {
          ...item,
          config: {
            ...item.config,
            BackupLoc: e.target.value
          }
        }
      }
      return item
    })

    setData(newData)
  }

  return (
    <div className="option-tab-container">
      <Input
        placeholder="Enter Backup Location (e.g., /path/to/backup)"
        value={Data.find((item) => item.name === ActiveItem)?.config.BackupLoc || ''}
        onChange={handleInputChange}
        className="backup-input"
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
  Data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  ActiveItem: PropTypes.string.isRequired,
  BackupFunc: PropTypes.func.isRequired
}

export default OptionTab
