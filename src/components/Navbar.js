import React from 'react'
import './Navbar.css'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { motion } from 'framer-motion/dist/framer-motion'
import logo from '../assets/logo.png'



function Navbar() {
  const { color } = useTheme()

  return (
    <motion.div 
      className='navbar' 
      style={{ background: color}}
    >
      <nav>
        <Link exact to='/' className='brand'>
          <img src={logo} alt='Film List Logo' />
        </Link>
        <SearchBar />
        <Link exact to='/create'>Add Film</Link>
      </nav>
    </motion.div>
  )
}

export default Navbar