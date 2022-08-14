import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './SearchBar.css'

function SearchBar() {
  const [term, setTerm] = useState('')

  useEffect(() => {
    term.length > 0
      ?
      history.push(`/search?q=${term}`)
      :
      history.push(`/`)
  }, [term, setTerm])


  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    setTerm(e.target.value)
  }

  return (
    <div className='searchbar'>
      <form onChange={handleSubmit}>
        <label htmlFor='search'>Search:</label>
        <input
          type='text'
          id='search'
          placeholder='By Film Title'
          onChange={(e) => handleSubmit}
          required
        />
      </form>
    </div>
  )
}

export default SearchBar
