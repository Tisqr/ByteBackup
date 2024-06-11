import { Button, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const Header = ({ showModal }) => {
  return (
    <>
      <div className="header">
        <Tooltip title="New">
          <Button type="primary" onClick={showModal} shape="default" icon={<PlusOutlined />} />
        </Tooltip>
      </div>
    </>
  )
}

Header.propTypes = {
  showModal: PropTypes.func
}

export default Header
