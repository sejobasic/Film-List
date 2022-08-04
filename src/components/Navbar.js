import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'


function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <Link exact to='./' className='brand'>
          <h1>Film List</h1>
        </Link>
        <SearchBar />
        <Link to='./create'>Add Film</Link>
      </nav>
    </div>
  )
}

export default Navbar