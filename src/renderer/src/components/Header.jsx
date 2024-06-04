import { Input, Button, Tooltip } from 'antd'
import { PlusOutlined, CheckOutlined, DeleteOutlined, ToolOutlined } from '@ant-design/icons'

const { Search } = Input

const Header = ({BackupLoc}) => {
  return (
    <>
      <div className="header">
        <Search placeholder="Search..." enterButton />
        <Tooltip title="Options">
          <Button type="primary" shape="default" icon={<ToolOutlined />} />
        </Tooltip>
        <Tooltip title="Delete">
          <Button type="primary" shape="default" icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title="New">
          <Button type="primary" shape="default" icon={<PlusOutlined />} />
        </Tooltip>
        <Tooltip title="Backup">
          <Button type="primary" shape="default" icon={<CheckOutlined />} />
        </Tooltip>
      </div>
      <div>
        <Input placeholder="Backup Location" value={BackupLoc} />
      </div>
    </>
  )
}

export default Header
