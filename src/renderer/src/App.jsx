import { useState } from 'react'
import Header from './components/Header'
import TreeList from './components/GroupsList'
import DataTable from './components/DataTable'
import './assets/App.css'

const ListDataSource = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
]

const TableDataSource = Array.from({ length: 20 }, (_, i) => ({
  key: `${i + 1}`,
  name: `Name ${i + 1}`,
  age: 20 + (i % 30),
  address: `Address ${i + 1}`
}))

function App() {
  const [dataSource, setDataSource] = useState(TableDataSource)
  const [loading, setLoading] = useState(false)

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    // Simulate a fetch request
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => ({
        key: `${dataSource.length + i + 1}`,
        name: `Name ${dataSource.length + i + 1}`,
        age: 20 + ((dataSource.length + i) % 30),
        address: `Address ${dataSource.length + i + 1}`
      }))
      setDataSource([...dataSource, ...newItems])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <TreeList data={ListDataSource} />
        <DataTable dataSource={dataSource} loadMoreData={loadMoreData} />
      </div>
    </div>
  )
}

export default App
