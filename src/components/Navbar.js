import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <Link exact to='./' className='brand'>
          <h1>Film List</h1>
        </Link>
        <Link to='./create'>Add Film</Link>
      </nav>
    </div>
  )
}

export default Navbar