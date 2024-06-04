/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Header from './components/Header'
import DataTable from './components/DataTable'
import GroupsList from './components/GroupsList'
import copyFile from './components/copyFile'
import { Tabs } from 'antd'
import './assets/App.css'

const ListDataSource = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
]

const TableDataSource = [
  {
    key: '1',
    path: 'test'
  }
]

function App() {
  const [dataSource, setDataSource] = useState(TableDataSource)
  var BackupLoc = 'test'

  const handleCopy = async () => {
    for (const path of dataSource) {
      var temp = path.path.split('/').slice(-1).pop()
      await copyFile(path.path, BackupLoc + temp)
    }
  }

  handleCopy()

  return (
    <div className="app-container">
      <Header BackupLoc={BackupLoc} />
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
