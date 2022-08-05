import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useTheme } from '../hooks/useTheme'
import logo from '../assets/logo.png'



function Navbar() {
  const { color } = useTheme()


  return (
    <div className='navbar' style={{ background: color}}>
      <nav>
        <Link exact to='/' className='brand'>
          <img src={logo} alt='Film List Logo' />
        </Link>
        <SearchBar />
        <Link to='./create'>Add Film</Link>
      </nav>
    </div>
  )
}

export default Navbar