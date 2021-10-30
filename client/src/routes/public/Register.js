import React from 'react'
import { useAuth } from '../../context'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../components/form/Input'
import PasswordScore from '../../components/PasswordScore'
import { changeTitle } from '../../utils/doc'
import './Login.css'

const Register = () => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirmed: '',
  })
  const [validation, setValidation] = React.useState({
    userExists: true,
    uppercases: false,
    lowercases: false,
    digit: false,
    punct: false,
    length: false,
  })

  const { register, error, usernameExists } = useAuth()
  const history = useHistory()

  React.useEffect(() => changeTitle('Register'), [])

  const passwordScore = () => {
    const count = Object.keys(validation).length - 1
    let passed = 0
    for (let key in validation) {
      if (key === 'userExists') continue
      if (validation[key]) passed++
    }

    if (passed === 0) return 0
    return (passed / count) * 100
  }

  const isValid = () => (data.username !== '' && data.password !== '' &&
    !validation.userExists && data.password === data.confirmed &&
    passwordScore() > 60)

  const handleRegister = async e => {
    e.preventDefault()
    if (isValid()) {
      await register(data.username, data.password)
      history.push('/login')
    }
  }

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const checkUsername = async () => {
    if (data.username !== '')
      setValidation(async prev => ({
        ...prev,
        userExists: await usernameExists(data.username),
      }))
  }

  const checkPassword = e => {
    const { value } = e.target
    setValidation(prev => ({
      ...prev,
      uppercases: /^(.*?[A-Z]){2,}/.test(value),
      lowercases: /^(.*?[a-z]){2,}/.test(value),
      digit: /^(?=.*\d)/.test(value),
      punct: /^(?=.*?[#?!@$%^&*-])/.test(value),
      length: value.length > 11,
    }))
  }

  return (
    <div className="login-wrap">
      <div className="content">
        <form
          className="user-form register"
          onSubmit={handleRegister}
        >
          <div className="inputs">
            <Input
              label="Username:"
              name="username"
              value={data.username}
              onChange={handleChange}
              onBlur={checkUsername}
            />
            <Input
              type="password"
              label="Password:"
              name="password"
              value={data.password}
              onChange={handleChange}
              onKeyUp={checkPassword}
            />
            <PasswordScore score={passwordScore()} />
            <Input
              type="password"
              label="Confirm:"
              name="confirmed"
              value={data.confirmed}
              onChange={handleChange}
            />
          </div>
          <div className="action">
            <Input
              type="submit"
              name="register"
              value="Register"
              props={{ disabled: !isValid() }}
            />

            <Link to="/login">Go to login...</Link>
          </div>
          {error && <div className="error"><p>{error}</p></div>}
        </form>
      </div>
    </div>
  )
}

export default Register
