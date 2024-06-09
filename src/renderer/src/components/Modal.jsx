import { Modal, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

const NewModal = ({
  ModalValue,
  setModalValue,
  setIsModalOpen,
  isModalOpen,
  SelectValue,
  setSelectValue,
  handleOk
}) => {
  const handleInputChange = (e) => {
    setModalValue(e.target.value)
  }

  const handleSelectChange = (value) => {
    console.log(value)
    setSelectValue(value)
  }

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
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
      </div>
    </Modal>
  )
}

NewModal.propTypes = {
  setModalValue: PropTypes.func.isRequired,
  ModalValue: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  SelectValue: PropTypes.string.isRequired,
  setSelectValue: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired
}

export default NewModal
