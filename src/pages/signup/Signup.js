import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Custom Hooks
import { useSignup } from '../../hooks/useSignup'
import { useTheme } from '../../hooks/useTheme'

// Assets
import arrowIcon from '../../assets/arrow-icon.svg'

// Styling
import './Signup.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')

  // Custom Hooks
  const { signup, loading, error } = useSignup()
  const { color, mode } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <form className={`signup-form ${mode}`} onSubmit={handleSubmit}>
      <h2>Signup</h2>
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
      <label>
        <span>Display Name:</span>
        <input
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
      <div className='btn-container'>
        {!loading && (
          <div>
          <button style={{ background: color }} className='btn'>
            Submit
          </button>
          </div>
        )}
        {/* disable button while waiting for request */}
        {loading && (
          <button className='btn disabled' disabled>
            Loading
          </button>
        )}
        <Link exact to='/login'>
          <img className='arrow-icon' src={arrowIcon} alt='go back arrow icon' />
        </Link>
      </div>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup
