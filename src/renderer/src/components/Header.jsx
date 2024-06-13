import { Button, Tooltip, Select, Input, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Option } = Select
const Header = ({ ModalValue, setModalValue, SelectValue, setSelectValue, handleOk }) => {
  const handleInputChange = (e) => {
    setModalValue(e.target.value)
  }

  const handleSelectChange = (value) => {
    console.log(value)
    setSelectValue(value)
  }

  return (
    <>
      <Flex gap={'small'}>
        <Select
          value={SelectValue}
          onChange={handleSelectChange}
          defaultValue="path"
          style={{ width: 120 }}
        >
          <Option value="group">Group</Option>
          <Option value="path">Path</Option>
        </Select>
        <Input placeholder="Enter..." value={ModalValue} onChange={handleInputChange} />
        <Tooltip title="New">
          <Button type="primary" onClick={handleOk} shape="default" icon={<PlusOutlined />} />
        </Tooltip>
      </Flex>
    </>
  )
}

Header.propTypes = {
  ModalValue: PropTypes.string.isRequired,
  setModalValue: PropTypes.func.isRequired,
  SelectValue: PropTypes.string.isRequired,
  setSelectValue: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired
}

export default Header
