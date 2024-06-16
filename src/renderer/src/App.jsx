import { useState, useEffect } from 'react'
import Header from './components/Header'
import DataTable from './components/DataTable'
import GroupsList from './components/GroupsList'
import OptionTab from './components/OptionsTab'
import { Tabs } from 'antd'
import './assets/App.css'

function App() {
  const [Data, setData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [InputValue, setInputValue] = useState('')
  const [SelectValue, setSelectValue] = useState('path')
  const [ActiveItem, setActiveItem] = useState('')

  const addData = () => {
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
        }
        if (SelectValue == 'group') {
          console.log('1')
          if (!newData.find((item) => item.name === InputValue)) {
            console.log('2')
            let tempItem = {
              name: InputValue,
              TableData: [],
              config: {
                BackupLoc: ''
              }
            }
            newData.push(tempItem)
          }
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
    async function setData() {
      window.electron.updateFile(JSON.stringify(Data))
    }
    if (dataLoaded) {
      setData()
    }
  }, [Data, dataLoaded])

  return (
    <div className="app-container">
      <Header
        ModalValue={InputValue}
        setModalValue={setInputValue}
        SelectValue={SelectValue}
        setSelectValue={setSelectValue}
        handleOk={addData}
      />
      <div className="content">
        <div className="groups-list-container">
          <GroupsList Data={Data} setData={setData} setActiveItem={setActiveItem} />
        </div>
        <div className="tabs-container">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                label: 'Paths',
                children: <DataTable Data={Data} setData={setData} ActiveItem={ActiveItem} />
              },
              {
                key: '2',
                label: 'Options',
                children: (
                  <OptionTab
                    Data={Data}
                    setData={setData}
                    ActiveItem={ActiveItem}
                    BackupFunc={() => {
                      const filesToCopy = Data.filter((item) => item.name === ActiveItem).flatMap(
                        (item) => item.TableData
                      )
                      const backupLocation =
                        Data.find((item) => item.name === ActiveItem)?.config.BackupLoc || ''
                      window.electron.copyFiles(filesToCopy, backupLocation)
                    }}
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
