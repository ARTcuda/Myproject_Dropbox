import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileItem from './FileItem'
import Header from './Header'
import Footer from './Footer'
const API_URL = 'http://localhost:3001'

function App() {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([]) // исправить, не работает. В FileItem лежит еще один onclick решить что оставить и сделать что бьі работало

  const showAlert = (a) => {
    alert(a);
  }


  useEffect( async () => {
    const listResponse = await fetch(`${API_URL}/dropbox/list`)
    console.log(listResponse)
    const listJSONResponse = await listResponse.json()
    setList(listJSONResponse)
  }, [])

  const updateFiles = list => {
    const newlistResponse = fetch(`${API_URL}/dropbox/addItems`)
    console.log(newlistResponse)
    const newlistJSONResponse = newlistResponse.json()
    setList(...list,...newlistJSONResponse)
  }

  const handleButtonClick = () =>{
    console.log('clicked')
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
      <button onClick={handleButtonClick} type="button" class="btn btn-primary">Add New Files</button>
      <Footer/>
    </div>
    
  ); 
}

export default App;