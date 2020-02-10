import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import '../styles/Signup.css'



const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')

  const [user, setUser] = useState(null)

  console.log(firstName)


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await usersService.create({
        firstName, lastName, username, email, status, password, date: new Date().toISOString()
      })
      console.log(date)

      setUser(user)

      setFirstName('')
      setLastName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setStatus(null)
    } catch (exception) {
      console.log('error')
    }


  }


  const createAccount = () => (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              value={firstName}
              className=""
              placeholder="First Name"
              name="firstName"
              noValidate
              onChange={({ target }) => setFirstName(target.value)}
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              value={lastName}
              className=""
              placeholder="Last Name"
              name="lastName"
              noValidate
              onChange={({ target }) => setLastName(target.value)} />
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              className=""
              placeholder="User Name"
              name="username"
              noValidate
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div className="username">
            I am a:
            {/* <label for="photographer"> */}
            <input
              // id="photographer"
              type="radio"
              name="status"
              value="photographer"
              onClick={({ target }) => setStatus(target.value)} />photographer
              {/* </label> */}
            <input
              type="radio"
              name="status"
              value="model"
              onClick={({ target }) => setStatus(target.value)} />Model
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              className=""
              placeholder="Email"
              name="email"
              noValidate
              onChange={({ target }) => setEmail(target.value)} />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              className=""
              placeholder="Password"
              name="password"
              noValidate
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  )

  return (
    <div>
      {createAccount()}
    </div>
  )


}

export default Signup