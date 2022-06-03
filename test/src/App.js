import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileItem from './FileItem'
import Header from './Header'
import Footer from './Footer'
import { API_URL } from './constants'

function App() {
  const [list, setList] = useState([])
  const [cursor, setCursor] = useState('')
  const [selected, setSelected] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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


  //wtf
  const handleClickLogin = async() => {
    window.location.href="https://dropbox.com/oauth2/authorize?response_type=token&client_id=ka73scg36t1bp9y&redirect_uri=http://localhost:3000/"
    //console.log(window.location.pathname) єто не работает т.к. я открьіваю ссьілку там еще 3 перехода и нужно уже после єтих переходов получать урл
    //const token=smtUrlParser(window.location.href)
    //throwTokenToBack(token)

  }

  return (
    <div className="App">
      <Header />
      {isLoggedIn ? (
         <><div className="container py-3">
            <div className="btn-group d-block float-end" role="group">
              <button type="button" className="btn btn-secondary">Upload</button>
              <button type="button" className="btn btn-secondary">Move</button>
              <button type="button" className="btn btn-secondary">Delete</button>
            </div>
          </div><div className="container py-3">
              {list.map((item) => <FileItem
                key={item.id}
                item={item}
                selected={selected.includes(item.id)}
                setSelected={setSelected} />)}
            </div><button onClick={loadMore} type="button" className="btn btn-primary">Load more</button></>
      ) : (
        <div className="container py-3" >
          <div className="card">
            <div className="card-header bg-danger d-flex justify-content-center ">
              You are not logged in!
            </div>
            <div className="card-body">
              <h5 className="card-title">If you want to use this application you should be logged in</h5>
              <p className="card-text">To log in, please click on button bellow. You will be redirected to official Dropbox website with log in form.</p>
              <button className="btn btn-success mx-auto d-block" onClick={handleClickLogin} >Login</button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default App