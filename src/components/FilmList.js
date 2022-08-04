import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import './FilmList.css'

function FilmList({ films }) {
  const { color, mode } = useTheme()

  if (films.length === 0) {
    return <div className='error'>No Films Found</div>
  }
  
  const renderFilms = films.map((film) => {
    return (
      <div className={`card ${mode}`} key={film.id}>
        <img src={film.filmImage} alt='poster artwork of film' />
          <h3>{film.title}</h3>
          <p>{film.genre}</p>
          <div className='film-description'>
            {film.description.substring(0, 100)}...
          </div>
          <Link style={{ background: color}} to={`/films/${film.id}`}>More Info</Link>
      </div>
    )
  })
  return (
    <div className='film-list'>{renderFilms}</div>
  )
}

export default FilmList
