import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// Assets
import searchIcon from '../../assets/search-icon.svg'

// Styling
import './SearchBar.css'

function SearchBar({ search }) {
  const [term, setTerm] = useState('')

  useEffect(() => {
    term.length > 0 ? history.push(`/search?q=${term}`) : history.push(`/`)
  }, [term, setTerm])

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    setTerm(e.target.value)
  }

  return (
    <div className='searchbar'>
      <form onChange={handleSubmit}>
        <img
          className='search-icon'
          src={searchIcon}
          alt='search icon'
          onClick={() => search(true)}
        />
        <input
          className='search-input'
          type='text'
          id='search'
          placeholder='By Film Title'
          required
        />
        {/* <img
          src={searchIcon}
          alt='search icon'
          onClick={search(false)}
        /> */}
      </form>
    </div>
  )
}

export default SearchBar
