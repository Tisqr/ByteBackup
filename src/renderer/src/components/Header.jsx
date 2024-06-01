import { Input, Button, Tooltip } from 'antd'
import { PlusOutlined, CheckOutlined, DeleteOutlined, ToolOutlined } from '@ant-design/icons'

const { Search } = Input

const Header = () => {
  return (
    <div className="header">
      <Search placeholder="Search..." enterButton />
      <Tooltip title="options">
        <Button type="primary" shape="default" icon={<ToolOutlined />} />
      </Tooltip>
      <Tooltip title="delete">
        <Button type="primary" shape="default" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="new">
        <Button type="primary" shape="default" icon={<PlusOutlined />} />
      </Tooltip>
      <Tooltip title="ok">
        <Button type="primary" shape="default" icon={<CheckOutlined />} />
      </Tooltip>
    </div>
  )
}

export default Header
