import React from 'react'
import './Navbar.css'
import SearchBar from '../search-bar/SearchBar'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLogout } from '../../hooks/useLogout'
import logo from '../../assets/logo.png'
import logoutIcon from '../../assets/logout-icon.svg'
import { useAuthContext } from '../../hooks/useAuthContext'

function Navbar() {
  const { color } = useTheme()
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <Link exact to='/' className='brand'>
          <img className='logo' src={logo} alt='Film List Logo' />
        </Link>
        {/* Render elements only when user is logged in */}
        {user && (
          <>
            <SearchBar />
            <Link className='add-film' to='/create?action=create'>
              Add Film
            </Link>
            <div className='logout-container'>
              <p>logged in as: {user.displayName}</p>
              <img 
                className='logout' 
                src={logoutIcon}
                onClick={logout}
                alt='logout icon' 
              />
            </div>
          </>
        )}
      </nav>
    </div>
  )
}

export default Navbar
