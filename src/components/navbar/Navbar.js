import React from 'react'
import './Navbar.css'
import SearchBar from '../search-bar/SearchBar'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLogout } from '../../hooks/useLogout'
import logo from '../../assets/logo.png'
import logoutIcon from '../../assets/logout-icon.svg'

function Navbar() {
  const { color } = useTheme()
  const { logout } = useLogout()

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <Link exact to='/' className='brand'>
          <img className='logo' src={logo} alt='Film List Logo' />
        </Link>
        <SearchBar />
        <Link className='add-film' to='/create?action=create'>
          Add Film
        </Link>
        <img 
          className='logout' 
          src={logoutIcon}
          onClick={logout}
          alt='logout icon' 
        />
      </nav>
    </div>
  )
}

export default Navbar
