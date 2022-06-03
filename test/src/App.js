import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileItem from './FileItem'
import Header from './Header'
import Footer from './Footer'
import { API_URL } from './constants'


const parseQueryString = str => {
  const ret = Object.create(null);

  if (typeof str !== 'string') {
    return ret;
  }

  str = str.trim().replace(/^(\?|#|&)/, '');

  if (!str) {
    return ret;
  }

  str.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    let key = parts.shift();
    let val = parts.length > 0 ? parts.join('=') : undefined;

    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });

  return ret;
}

function App() {
  const [list, setList] = useState([])
  const [cursor, setCursor] = useState('')
  const [selected, setSelected] = useState([])
  const token = parseQueryString(window.location.hash).access_token

  useEffect( () => {
    const fetchList = async () => {
      if (!token) {
        return
      }
      const listResponse = await fetch(`${API_URL}/dropbox/list?limit=${5}&dropboxToken=${token}`)
      const listJSONResponse = await listResponse.json()
      setList(listJSONResponse.entries)
      setCursor(listJSONResponse.cursor)
    }
    fetchList()
  }, [])

  const loadMore = async () => {
    if (!token) {
      return
    }
    const listResponse = await fetch(`${API_URL}/dropbox/addItems?cursor=${cursor}&dropboxToken=${token}`)
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
      {Boolean(token) ? (
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
                setSelected={setSelected}
                dropboxToken={token}
              />)}
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