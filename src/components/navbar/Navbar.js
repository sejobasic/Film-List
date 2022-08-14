import React from 'react'
import './Navbar.css'
import SearchBar from '../search-bar/SearchBar'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import logo from '../../assets/logo.png'

function Navbar() {
  const { color } = useTheme()

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <Link exact to='/' className='brand'>
          <img src={logo} alt='Film List Logo' />
        </Link>
        <SearchBar />
        <Link to="/create?action=create">
          Add Film
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
