import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useTheme } from '../hooks/useTheme'



function Navbar() {
  const { color } = useTheme()


  return (
    <div className='navbar' style={{ background: color}}>
      <nav>
        <Link exact to='/' className='brand'>
          <h1>Film List</h1>
        </Link>
        <SearchBar />
        <Link to='./create'>Add Film</Link>
      </nav>
    </div>
  )
}

export default Navbar