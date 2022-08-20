import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const { signup, loading, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <form 
      className='signup-form'
      onSubmit={handleSubmit}
    >
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
        {!loading && <button className='btn'>Submit</button>}
        {/* disable button while waiting for request */}
        {loading && <button className='btn disabled' disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup