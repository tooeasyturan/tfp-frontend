import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import usersService from '../services/users'
import Notification from './Notification'
import { FormGroup, Button, FormControl, FormLabel } from 'react-bootstrap'
import "../styles/Login.css"



const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      usersService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedTFPappUser', JSON.stringify(user))
      usersService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginFormBackup = () => (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel >Username</FormLabel >
          <FormControl
            autoFocus
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel >Password</FormLabel >
          <FormControl
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Login
    </Button>
      </form>
    </div>
  )

  const loginForm = () => (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input type="text"
              value={username}
              placeholder="Username"
              name="username"
              noValidate
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password"
              value={password}
              placeholder="Password"
              name="password"
              noValidate
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h1>{user.username} logged in</h1>
          <Button className="primary" href={user.username + '/profile'}>My Profile</Button>
        </div>
      }
    </div >

  )
}

export default Login