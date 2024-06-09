import { Modal, Input, Select, Flex } from 'antd'
import PropTypes from 'prop-types'

const NewModal = ({ setIsModalOpen, isModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex>
          <Select
            defaultValue="path"
            options={[
              {
                value: 'group',
                label: 'Group'
              },
              {
                value: 'path',
                label: 'Path'
              }
            ]}
          />
          <Input placeholder="Enter..." />
        </Flex>
      </Modal>
    </>
  )
}

NewModal.propTypes = {
  setIsModalOpen: PropTypes.func,
  isModalOpen: PropTypes.bool
}

export default NewModal
