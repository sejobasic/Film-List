import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { color, mode } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form 
      className={`login-form ${mode}`}
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input 
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <div className='btn-container'>
        <button style={{ background: color }} className='btn'>Login</button>
        <Link exact to='/signup'>
        <button style={{ background: color }} className='btn'>Signup</button>
        </Link>
      </div>
    </form>
  )
}

export default Login