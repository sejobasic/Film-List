import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Heading from '../../components/heading/Heading'

// Custom Hooks
import { useLogin } from '../../hooks/useLogin'
import { useTheme } from '../../hooks/useTheme'

// Assets

// Styling
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Custom Hooks
  const { login, error, loading } = useLogin()
  const { color, mode } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className='login-container'>
      <form className={`login-form ${mode}`} onSubmit={handleSubmit}>
        <Heading />
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
          {!loading && (
            <button style={{ background: color }} className='btn'>
              Login
            </button>
          )}
          {loading && (
            <button className='btn disabled' disabled>
              Loading
            </button>
          )}
          <Link exact to='/signup'>
            <button style={{ background: color }} className='btn'>
              Signup
            </button>
          </Link>
        </div>
        {error && <p>{error}</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login
