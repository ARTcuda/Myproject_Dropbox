import React from "react";
import byteSize from "byte-size"
import { DateTime } from "react-intl-datetime-format";
import './FileItem.css'
import logo_small from './Dropbox_Icon_small.png'

const Row = ({ children, style }) => <div style={{
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  ...style
}}>
  {children}
</div>

const Column = ({ children, style }) => <div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  ...style
}}>
  {children}
</div>

const Card = ({ children, style }) => <div style={{
  display: 'flex',
  width: '100%',
  maxWidth: '50rem',
  ...style
}}>
  {children}
</div>

export default ({ item, selected, setSelected }) => {
  console.log('selected in item', selected)
  const handleSelect = () => {
    setSelected(prev => {
      if (prev.includes(item.id)) {
        return [...prev.filter(id => id !== item.id)]
      }
      return [...prev, item.id]

    })
  }

  return (
    <Card>
      <Row onClick={handleSelect}>
        <Column style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexBasis: '7rem'
        }}>
          <div style={{
            backgroundImage: `url(${logo_small})`,
            objectFit: 'contain',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '3rem',
            width: '3rem',
            margin: '2rem'
          }} />
        </Column>
        <Column style={{ }}>
          <div>{selected.toString()}</div>
          <div>{item.name}</div>
          <div><DateTime locale="uk-UA">{new Date(item.client_modified)}</DateTime></div>
          <div>{byteSize(item.size).value} {byteSize(item.size).long}</div>
        </Column>
      </Row>
    </Card>
  )
}
