import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './Create.css'

function Create() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [filmImage, setFilmImage] = useState('')
  const [description, setDescription] = useState('')

  const history = useHistory()

  const { postData, data, error } = useFetch('http://localhost:3000/films', 'POST')

  function handleSubmit(e) {
    e.preventDefault()
    postData({title, genre, filmImage, description})
  }

  // Redirect user when we get data response
  useEffect(() => {
    // if data is present redirect user
    if (data) {
      history.push('/')
    }
  }, [data])

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Film</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Film Title:</span>
          <input 
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            />
        </label>
        <label>
          <span>Film Genre:</span>
          <input
            type='text'
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            required 
          />
        </label>
        <label>
          <span>Film Poster URL:</span>
          <input
            type='text'
            onChange={(e) => setFilmImage(e.target.value)}
            value={filmImage}
            required
          />
        </label>
        <label>
          <span>Film Description:</span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default Create