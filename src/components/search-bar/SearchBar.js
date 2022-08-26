import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'

// Assets
import searchIcon from '../../assets/search-icon.svg'

// Styling
import './SearchBar.css'

function SearchBar({ search }) {
  const [term, setTerm] = useState('')

  const history = useHistory()

  useEffect(() => {
    term.length > 0 ? history.push(`/search?q=${term}`) : history.push(`/`)
  }, [term, setTerm])

  function handleSubmit(e) {
    e.preventDefault()
    setTerm(e.target.value)
  }

  // animate searchbar
  const searchVariant = {
    hidden: {
      width: 20,
    },
    visible: {
      width: 200,
      transition: {
        duration: 0.7,
        type: 'spring',
      },
    },
  }

  return (
    <AnimatePresence>
      <div className='searchbar'>
        <form onChange={handleSubmit}>
          <img
            className='search-icon'
            src={searchIcon}
            alt='search icon'
            onClick={() => search(true)}
          />
          <motion.input
            className='search-input'
            variants={searchVariant}
            initial='hidden'
            animate='visible'
            type='text'
            id='search'
            placeholder='By Title or Genre'
            required
          />
        </form>
      </div>
    </AnimatePresence>
  )
}

export default SearchBar
