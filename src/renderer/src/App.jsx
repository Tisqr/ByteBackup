import { useState, useEffect } from 'react'
import Header from './components/Header'
import DataTable from './components/DataTable'
import GroupsList from './components/GroupsList'
import OptionTab from './components/OptionsTab'
import { Tabs } from 'antd'
import './assets/App.css'

function App() {
  const [Data, setData] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [backupLoc, setBackupLoc] = useState('')
  const [listDataSource, setListDataSource] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [InputValue, setInputValue] = useState('')
  const [SelectValue, setSelectValue] = useState('path')
  const [ActiveItem, setActiveItem] = useState('test')

  const addDataToTable = () => {
    if (InputValue !== '') {
      setData((prevData) => {
        const newData = [...prevData]
        const activeItemIndex = newData.findIndex((item) => item.name === ActiveItem)

        if (activeItemIndex !== -1) {
          if (SelectValue === 'path') {
            const newDataSource = [...newData[activeItemIndex].TableData]
            newDataSource.sort((a, b) => a.key - b.key)
            const lastKey = newDataSource.length ? newDataSource[newDataSource.length - 1].key : 0
            const myObject = { key: String(Number(lastKey) + 1), path: InputValue }
            newData[activeItemIndex].TableData = [...newDataSource, myObject]
          }
        } else if (SelectValue === 'group') {
          let tempItem = {
            name: InputValue,
            TableData: [],
            config: {
              BackupLoc: ''
            }
          }
          newData.push(tempItem)
        }
        return newData
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await window.electron.getFile()
        result = JSON.parse(result)
        if (result) {
          setData(result)
        }
      } catch (error) {
        console.error('Error getting file:', error)
      }
    }
    setDataLoaded(true)
    fetchData()
  }, [])

  useEffect(() => {
    let tempData = []

    async function fsetDataSource() {
      for (const item of Data) {
        if (item.name === ActiveItem) {
          tempData = item.TableData
        }
      }
      setDataSource(tempData)
    }

    fsetDataSource()

    tempData = []

    async function fsetListDataSource() {
      for (const item of Data) {
        tempData.push(item.name)
      }
      setListDataSource(tempData)
    }

    fsetListDataSource()

    let tempbackuploc

    async function fsetBackupLoc() {
      for (const item of Data) {
        if (item.name === ActiveItem) tempbackuploc = item.config.BackupLoc
      }
      setBackupLoc(tempbackuploc)
    }

    fsetBackupLoc()
  }, [Data, ActiveItem])

  useEffect(() => {
    async function setData() {
      window.electron.updateFile(JSON.stringify(Data))
    }
    if (dataLoaded) {
      setData()
      console.log('ST')
    }
  }, [Data, dataLoaded])

  return (
    <div className="app-container">
      <Header
        BackupLoc={backupLoc}
        ModalValue={InputValue}
        setModalValue={setInputValue}
        SelectValue={SelectValue}
        setSelectValue={setSelectValue}
        handleOk={addDataToTable}
      />
      <div className="content">
        <div className="groups-list-container">
          <GroupsList
            Data={Data}
            setData={setData}
            setActiveItem={setActiveItem}
            ListDataSource={listDataSource}
          />
        </div>
        <div className="tabs-container">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                label: 'Paths',
                children: (
                  <DataTable
                    dataSource={dataSource}
                    setDataSource={setDataSource}
                    ActiveItem={ActiveItem}
                  />
                )
              },
              {
                key: '2',
                label: 'Options',
                children: (
                  <OptionTab
                    Data={Data}
                    setData={setData}
                    ActiveItem={ActiveItem}
                    BackupFunc={() => window.electron.copyFiles(dataSource, backupLoc)}
                  />
                )
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default App

// [
//   ({
//     name: 'test',
//     TableData: [
//       { key: '1', path: 'sefsef' },
//       { key: '2', path: 'sefsef' },
//       { key: '3', path: 'sefsef' }
//     ],
//     config: {
//       BackupLoc: 'qeqweqwe'
//     }
//   },
//   {
//     name: 'test2',
//     TableData: [
//       { key: '1', path: 'sefsef' },
//       { key: '2', path: 'sefsef' },
//       { key: '3', path: 'sefsef' }
//     ],
//     config: {
//       BackupLoc: 'sefsefs'
//     }
//   })
// ]
