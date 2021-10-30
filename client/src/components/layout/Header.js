import React from 'react'
import { useAuth } from '../../context'
import { Link } from 'react-router-dom'
import { useQuery } from '../../utils/router'
import './Header.css'

const Header = () => {
  const { isAdmin } = useAuth()
  const category = useQuery().get('category')

  return (
    <header className="header">
      <div className="brand">
        <h1>Library</h1>
      </div>

      <div className="action">
        {isAdmin() && <Link to={`${category ? `/books/new?category=${category}` : '/books/new'}`}><button>New Book</button></Link>}
      </div>
    </header>
  )
}

export default Header
