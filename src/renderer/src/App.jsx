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
  const [dataLoaded, setDataLoaded] = useState(false) // New state to track if data is loaded

  const showModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let result = JSON.parse(await window.electron.getFile())
        setBackupLoc(result.BackupLoc)
        setDataSource(result.TableDataSource)
        setListDataSource(result.ListDataSource)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error getting file:', error)
      }
    }

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

  return (
    <div className="app-container">
      <Header
        BackupLoc={backupLoc}
        setBackupLoc={setBackupLoc}
        BackupFunc={() => window.electron.copyFiles(dataSource, backupLoc)}
        showModal={showModal}
      />
      <div className="content">
        <GroupsList data={listDataSource} />
        <NewModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        <Tabs
          defaultActiveKey="1"
          items={[
            { key: '1', label: 'Paths', children: <DataTable dataSource={dataSource} /> },
            { key: '2', label: 'Options', children: '' }
          ]}
        />
      </div>
    </div>
  )
}

export default App
