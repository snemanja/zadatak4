import React from 'react'
import { useAuth } from '../../context'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { changeTitle } from '../../utils/doc'
import Input from '../../components/form/Input'
import './Login.css'

const Login = () => {
  const [data, setData] = React.useState({
    username: '',
    password: ''
  })

  const { user, login, error } = useAuth()
  const history = useHistory()

  React.useEffect(() => changeTitle('Login'), [])

  const isValid = () => (data.username !== '' && data.password !== '')

  const handleLogin = async e => {
    e.preventDefault()
    if (isValid()) {
      await login(data.username, data.password)
      history.push('/books')
    }
  }

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return user === false ? (
    <div className="login-wrap">
      <div className="content">
        <form
          className="user-form login"
          onSubmit={handleLogin}
        >
          <div className="inputs">
            <Input
              label="Username:"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password:"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="action">
            <Input
              type="submit"
              name="login"
              value="Login"
              props={{ disabled: !isValid() }}
            />

            <Link to="/register">Register?</Link>
          </div>
          {error && <div className="error"><p>{error}</p></div>}
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/books" />
  )
}

export default Login
