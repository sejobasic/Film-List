import React, { useState } from 'react'
import './Signup.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
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
        <span>Display Name:</span>
        <input 
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
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
        <button className='btn'>Submit</button>
      </div>
    </form>
  )
}

export default Signup