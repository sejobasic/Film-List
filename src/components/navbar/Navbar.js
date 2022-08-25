import React, { useState } from 'react'
import SearchBar from '../search-bar/SearchBar'
import { Link } from 'react-router-dom'

// Custom hooks
import { useTheme } from '../../hooks/useTheme'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

// Assets
import logoutIcon from '../../assets/logout-icon.svg'
import addIcon from '../../assets/add-icon.svg'
import searchIcon from '../../assets/search-icon.svg'

// Styling
import './Navbar.css'

function Navbar() {
  const [showSearch, setShowSearch] = useState(true)

  // Custom Hooks
  const { color } = useTheme()
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <Link exact to='/' className='brand'>
          {/* <img className='logo' src={logo} alt='Film List Logo' /> */}
          <h2 className='logo'>filmlist.</h2>
        </Link>
        {/* Render elements only when user is logged in */}
        {user && (
          <>
            <div className='search-container'>
              {showSearch ? (
                <img
                  className='search'
                  src={searchIcon}
                  alt='search icon'
                  onClick={() => setShowSearch(false)}
                />
              ) : (
                <SearchBar search={setShowSearch} />
              )}
              <Link to='/create?action=create'>
                <img
                  className='add-film'
                  src={addIcon}
                  alt='icon for adding films'
                />
              </Link>
            </div>
            <div className='logout-container'>
              <p>hello, {user.displayName}</p>
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
