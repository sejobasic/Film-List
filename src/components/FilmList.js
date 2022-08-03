import React from 'react'
import { Link } from 'react-router-dom'
import './FilmList.css'

function FilmList({ films }) {
  
  const renderFilms = films.map((film) => {
    return (
      <div className='card' key={film.id}>
        <h2>{film.title}</h2>
        <p>{film.genre}</p>
        <img src={film.filmImage} alt='poster artwork of film' />
        <div className='film-description'>
          {film.description.substring(0, 100)}...
        </div>
        <Link to={`/films/${film.id}`}>Watch This</Link>
      </div>
    )
  })
  return (
    <div className='film-list'>{renderFilms}</div>
  )
}

export default FilmList
