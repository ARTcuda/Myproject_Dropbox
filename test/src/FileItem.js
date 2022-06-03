import React from "react";
import byteSize from "byte-size"
import { DateTime } from "react-intl-datetime-format"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './FileItem.css'
import logo_small from './Dropbox_Icon_small.png'
import {faFileDownload } from "@fortawesome/free-solid-svg-icons";


export default ({ item, selected, setSelected }) => {
  console.log('selected in item', selected)
  
  //wtf handleSelect
  const handleSelect = () => {
    setSelected(prev => {
      if (prev.includes(item.id)) {
        return [...prev.filter(id => id !== item.id)]
      }
      return [...prev, item.id]

    })
  }


  /*  wtf?
  const handleClickDownload = async(path) =>{
  const stream = await fetch(`${API_URL}/dropbox/addItems?cursor=${path}`)

  }*/ 

  return (
    <div className="container py-3" >
      <div className="row">
      <div className="col-12 mt-3">
          <div className="card" >
          <div className="card-horizontal" onClick={() => handleSelect}>
            <div className="img-square-wrapper">
              <img src={logo_small} style={{
                  objectFit: 'contain',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '3rem',
                  width: '3rem',
                  margin: '2rem'}}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><small className="text-muted">{byteSize(item.size).value} {byteSize(item.size).long}</small></p>
                <p className="card-text"><small className="text-muted"><DateTime locale="uk-UA">{new Date(item.client_modified)}</DateTime></small></p>
                <p className="card-text"><small className="text-muted">{selected.toString()}</small></p>
            </div>
            <div className="img-square-wrapper">
              <FontAwesomeIcon icon={faFileDownload} style={{
                  objectFit: 'contain',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '2rem',
                  width: '2rem',
                  margin: '2rem',
                  color: "#6c757d" }}/>
            </div>    
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}
