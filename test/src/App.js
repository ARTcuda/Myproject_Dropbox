import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileItem from './FileItem'
import Header from './Header'
import Footer from './Footer'
const API_URL = 'http://localhost:3001'

function App() {
  const [list, setList] = useState([])
  const [cursor, setCursor] = useState('')
  const [selected, setSelected] = useState([]) // исправить, не работает. В FileItem лежит еще один onclick решить что оставить и сделать что бьі работало

  const showAlert = (a) => {
    alert(a);
  }

  const fetchList = async () => {
    const listResponse = await fetch(`${API_URL}/dropbox/list?limit=${5}`)
    const listJSONResponse = await listResponse.json()
    setList(listJSONResponse.entries)
    setCursor(listJSONResponse.cursor)
  }

  useEffect( () => {
    fetchList()
  }, [])

  const loadMore = async () => {
    const listResponse = await fetch(`${API_URL}/dropbox/addItems?cursor=${cursor}`)
    console.log(listResponse)
    const listJSONResponse = await listResponse.json()
    setList([list, listJSONResponse.entries].flat())
    setCursor(listJSONResponse.cursor)
  }

  return (
    <div className="App">
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {list.map((item) => <FileItem
          key={item.id}
          item={item}
          selected={selected.includes(item.id)}
          setSelected={setSelected}
        />)}
      </div>
      <button onClick={loadMore} type="button" className="btn btn-primary">Load more</button>
      <Footer/>
    </div>
    
  ); 
}

export default App;