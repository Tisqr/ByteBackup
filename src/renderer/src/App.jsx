/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Header from './components/Header'
import DataTable from './components/DataTable'
import GroupsList from './components/GroupsList'
import { Tabs } from 'antd'
import './assets/App.css'

const ListDataSource = ['Homework Backup']

const TableDataSource = [
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
  {
    key: '1',
    path: 'test'
  },
]

function App() {
  const [dataSource, setDataSource] = useState(TableDataSource)
  var BackupLoc = 'test'

  const handleCopyFiles = async () => {
    try {
      const result = await window.electron.copyFiles(dataSource, BackupLoc)
      console.log(result)
    } catch (error) {
      console.error('Error copying files:', error)
    }
  }

  return (
    <div className="app-container">
      <Header BackupLoc={BackupLoc} BackupFunc={handleCopyFiles} />
      <div className="content">
        <GroupsList data={ListDataSource} />
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Paths',
              children: <DataTable dataSource={dataSource} />
            },
            {
              key: '2',
              label: 'Options',
              children: ''
            }
          ]}
        />
      </div>
    </div>
  )
}

export default App
