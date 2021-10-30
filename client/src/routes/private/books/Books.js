import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth, useBooks } from '../../../context'
import { changeTitle } from '../../../utils/doc'
import { useQuery } from '../../../utils/router'
import BooksAll from './BooksAll'
import BooksSelected from './BooksSelected'
import BooksNew from './BooksNew'
import Header from '../../../components/layout/Header'
import Sidebar from '../../../components/layout/Sidebar'
import Content from '../../../components/layout/Content'
import './Books.css'

const Books = () => {
  const { user } = useAuth()
  const { error, search, clearError } = useBooks()
  const category = useQuery().get('category')

  React.useEffect(() => {
    if (category !== null) {
      changeTitle(`Browsing '${category}'`)
    } else {
      if (search === '') {
        changeTitle()
      } else {
        changeTitle(`Searching for '${search}'`)
      }
    }
  }, [category, search])

  return !user ? (
    <Redirect to="/login" />
  ) : (
    <div className="books">
      <Header />
      <Sidebar />
      <Content>
        {error && <div className="error">{error} <button onClick={clearError}>x</button></div>}
        <Route path="/books">
          <BooksAll />
        </Route>
        <Route exact path="/books/selected/:id">
          <BooksSelected />
        </Route>
        <Route exact path="/books/new">
          <BooksNew />
        </Route>
      </Content>
    </div>
  )
}

export default Books
