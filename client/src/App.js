import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Books from './routes/private/books/Books'
import Login from './routes/public/Login'
import Register from './routes/public/Register'
import { BooksProvider } from './context'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/books">
            <BooksProvider>
              <Books/>
            </BooksProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
