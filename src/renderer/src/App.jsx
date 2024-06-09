import { useState, useEffect } from 'react'
import Header from './components/Header'
import DataTable from './components/DataTable'
import GroupsList from './components/GroupsList'
import NewModal from './components/Modal'
import { Tabs } from 'antd'
import './assets/App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [backupLoc, setBackupLoc] = useState('')
  const [listDataSource, setListDataSource] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [ModalValue, setModalValue] = useState('hello')
  const [SelectValue, setSelectValue] = useState('path')
  const [activeItem, setActiveItem] = useState([])

  const deleteItem = () => {
    if (activeItem[0] === 'list') {
      const updatedList = listDataSource.filter((item) => item !== activeItem[1])
      setListDataSource(updatedList)
    } else {
      const updatedDataSource = dataSource.filter((item) => item.path !== activeItem[1])
      setDataSource(updatedDataSource)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const addDataToTable = () => {
    if (ModalValue != '') {
      if (SelectValue === 'path') {
        setDataSource((prevDataSource) => {
          const newDataSource = [...prevDataSource]
          newDataSource.sort((a, b) => a.key - b.key)
          const lastKey = newDataSource.length ? newDataSource[newDataSource.length - 1].key : 0
          const myObject = { key: String(Number(lastKey) + 1), path: ModalValue }
          return [...newDataSource, myObject]
        })
      } else {
        setListDataSource((prevListDataSource) => [...prevListDataSource, ModalValue])
      }
    }
    setIsModalOpen(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await window.electron.getFile()
        result = JSON.parse(result)
        if (result && typeof result === 'object') {
          setBackupLoc(result.BackupLoc)
          setDataSource(result.TableDataSource)
          setListDataSource(result.ListDataSource)
        }
      } catch (error) {
        console.error('Error getting file:', error)
      }
    }
    setDataLoaded(true)

    fetchData()
  }, [])

  useEffect(() => {
    async function setData() {
      let tempData = {}
      tempData['BackupLoc'] = backupLoc
      tempData['TableDataSource'] = dataSource
      tempData['ListDataSource'] = listDataSource

      window.electron.updateFile(JSON.stringify(tempData))
    }
    if (dataLoaded) {
      setData()
    }
  }, [backupLoc, dataSource, listDataSource, dataLoaded])

  useEffect(() => {
    console.log(activeItem)
  }, [activeItem])

  return (
    <div className="app-container">
      <Header
        BackupLoc={backupLoc}
        setBackupLoc={setBackupLoc}
        BackupFunc={() => window.electron.copyFiles(dataSource, backupLoc)}
        showModal={showModal}
        DeleteItem={deleteItem}
      />
      <div className="content">
        <GroupsList
          data={listDataSource}
          setActiveListItem={setActiveItem}
          ActiveListItem={activeItem}
        />
        <NewModal
          ModalValue={ModalValue}
          setModalValue={setModalValue}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          handleOk={addDataToTable}
          SelectValue={SelectValue}
          setSelectValue={setSelectValue}
        />
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Paths',
              children: <DataTable dataSource={dataSource} setActiveTableItem={setActiveItem} />
            },
            { key: '2', label: 'Options', children: '' }
          ]}
        />
      </div>
    </div>
  )
}

export default App
