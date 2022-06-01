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
  const [selected, setSelected] = useState([])

  const showAlert = (a) => {
    alert(a);
  }

  useEffect( () => {
    const fetchList = async () => {
      const listResponse = await fetch(`${API_URL}/dropbox/list?limit=${5}`)
      const listJSONResponse = await listResponse.json()
      setList(listJSONResponse.entries)
      setCursor(listJSONResponse.cursor)
    }
    fetchList()
  }, [])

  const loadMore = async () => {
    const listResponse = await fetch(`${API_URL}/dropbox/addItems?cursor=${cursor}`)
    const listJSONResponse = await listResponse.json()
    setList([list, listJSONResponse.entries].flat())
    setCursor(listJSONResponse.cursor)
  }



  const handleClickLogin = async() => {
    window.location.href="https://dropbox.com/oauth2/authorize?response_type=token&client_id=ka73scg36t1bp9y&redirect_uri=http://localhost:3000/"
    //console.log(window.location.pathname)
    //const token=smtUrlParser(window.location.href)
    //throwTokenToBack(token)
    //wtf
  }

  return (
    <div className="App">
      <Header />
      <button onClick={handleClickLogin} className="btn btn-info">Login</button>
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