import React from 'react'
import { CATEGORIES } from '../../utils/constants'
import { useAuth } from '../../context'
import { NavLink } from 'react-router-dom'
import { useQuery } from '../../utils/router'
import './Sidebar.css'

const Sidebar = () => {
  const { logout } = useAuth()
  const category = useQuery().get('category')

  const renderItem = (name, link, props = {}) => {
    return (
      <li key={name}>
        <NavLink
          activeClassName={'active'}
          to={link}
          isActive={() => ((!category && name === 'All') || (category && category === name))}
          {...props}
        >
          {name}
        </NavLink>
      </li>
    )
  }

  return (
    <div className="sidebar">
      <div className="top">
        <h2>Categories</h2>
        <ul>
          {renderItem('All', '/books')}
          {CATEGORIES.map(cat => renderItem(cat, `/books?category=${cat}`,
            { key: cat }))}
        </ul>
      </div>
      <div className="bottom">
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  )
}

export default Sidebar
