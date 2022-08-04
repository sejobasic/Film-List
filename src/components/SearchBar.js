import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SearchBar.css'

function SearchBar() {
  const [term, setTerm] = useState('')
  
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    history.push(`/search?q=${term}`)
  }

  return (
    <div className='searchbar'>
      <form onChange={handleSubmit}>
        <label htmlFor='search'>Search:</label>
        <input 
          type='text'
          id='search'
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  )
}

export default SearchBar