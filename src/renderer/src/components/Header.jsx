import { Input, Button, Tooltip } from 'antd'
import { PlusOutlined, CheckOutlined, DeleteOutlined, ToolOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
// import Store from 'electron-store'

// const store = new Store()

const { Search } = Input

const Header = ({ BackupLoc, BackupFunc }) => {
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
          <Button
            type="primary"
            // onClick={console.log(store.get('unicorn'))}
            shape="default"
            icon={<PlusOutlined />}
          />
        </Tooltip>
        <Tooltip title="Backup">
          <Button type="primary" onClick={BackupFunc} shape="default" icon={<CheckOutlined />} />
        </Tooltip>
      </div>
      <div>
        <Input placeholder="Backup Location" defaultValue={BackupLoc} />
      </div>
    </>
  )
}

Header.propTypes = {
  BackupFunc: PropTypes.func,
  BackupLoc: PropTypes.string
}

export default Header
