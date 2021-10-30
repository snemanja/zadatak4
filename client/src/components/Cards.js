import React from 'react'
import Card from './Card'
import './Cards.css'

const Cards = ({ data }) => {
  return (
    <div className="cards">
      {data.map(item => <Card key={item.id} book={item} />)}
    </div>
  )
}

export default Cards
