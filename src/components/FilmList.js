import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'
import deleteIcon from '../assets/delete-icon.svg'
import './FilmList.css'

function FilmList({ films }) {
  const { color, mode } = useTheme()

  if (films.length === 0) {
    return <div className='error'>No Films Found</div>
  }

  // Delete document from database
  const handleDelete = (id) => {
    projectFirestore.collection('films').doc(id).delete()
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
        <Link style={{ background: color }} to={`/films/${film.id}`}>
          More Info
        </Link>
        <img 
          className='delete-icon' 
          onClick={() => handleDelete(film.id)}
          src={deleteIcon} 
          alt='delete icon' 
        />
      </div>
    )
  })
  return <div className='film-list'>{renderFilms}</div>
}

export default FilmList
