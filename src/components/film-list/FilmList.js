import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'

// Custom Hooks
import { useTheme } from '../../hooks/useTheme'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// Assets
import deleteIcon from '../../assets/delete-icon.svg'
import editIcon from '../../assets/edit-icon.svg'

// Styling
import './FilmList.css'

function FilmList({ films, isDeleted }) {
  const [addedFilm, setAddedFilm] = useState(null)
  const [updatedFilm, setUpdatedFilm] = useState(null)

  // Custom Hooks
  const { user } = useAuthContext()
  const { color, mode } = useTheme()
  const { deleteDocument } = useFirestore('films')

  const location = useLocation()
  const history = useHistory()

  const hasRenderedFilms = useRef(false)
  // use effect to track rendered film
  useEffect(() => {
    if (films) {
      hasRenderedFilms.current = true
    } else {
      hasRenderedFilms.current = false
    }
  }, [films])

  useEffect(() => {
    if (location.state) {
      if (location.state.addedFilm) {
        setAddedFilm(location.state.addedFilm)
      } else if (location.state.updatedFilm) {
        setUpdatedFilm(location.state.updatedFilm)
      }
      setTimeout(() => {
        location.state = null
        setAddedFilm(null)
        setUpdatedFilm(null)
      }, [2000])
    }
  }, [location])

  if (films.length === 0) {
    return (
      <div className={`error ${mode}`} style={{ background: color }}>
        <p className='error-message'>
          NO FILMS FOUND IN {user.displayName}S LIST PLEASE ADD A FILM
        </p>
      </div>
    )
  }

  // animate functions for alert boxes
  const alertVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 2,
      },
    },
  }

  const renderFilms = films.map((film, i) => {
    return (
      <AnimatePresence>
        <motion.div
          variants={{
            hidden: (i) => ({
              opacity: 0,
            }),
            visible: (i) => ({
              opacity: 1,
              transition: {
                delay: i * 0.2,
              },
            }),
            removed: {
              opacity: 0,
              transition: {
                delay: i * 0.2,
              },
            },
          }}
          initial={hasRenderedFilms.current ? 'visible' : 'hidden'}
          animate='visible'
          exit='removed'
          custom={i}
          className={`card ${mode}`}
          key={film.id}
        >
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
            onClick={() => deleteDocument(film.id)}
            confirm='yes'
            cancel='no'
            src={deleteIcon}
            alt='delete icon'
          />
          <img
            className='edit-icon'
            src={editIcon}
            alt='Edit icon'
            onClick={() => history.push(`/edit/${film.id}`)}
          />
        </motion.div>
      </AnimatePresence>
    )
  })
  return (
    <>
      <div className='user-list'>
        <h2 style={{ color: color }}>{user.displayName}s Film List</h2>
      </div>
      <motion.div variants={alertVariant} initial='hidden' animate='visible'>
        <div
          className='delete-alert-container'
          style={{
            display: isDeleted ? 'flex' : 'none',
          }}
        >
          <div className={isDeleted ? 'delete-alert show' : 'delete-alert'}>
            {`Film Deleted`}
          </div>
        </div>
        <div
          className='add-alert-container'
          style={{
            display: addedFilm ? 'flex' : 'none',
          }}
        >
          <div className={addedFilm ? 'add-alert show' : 'add-alert'}>
            {`${addedFilm ? '' + addedFilm.title : ''} Added`}
          </div>
        </div>

        <div
          className='update-alert-container'
          style={{
            display: updatedFilm ? 'flex' : 'none',
          }}
        >
          <div className={updatedFilm ? 'update-alert show' : 'update-alert'}>
            {`${updatedFilm ? '' + updatedFilm.title : ''} Updated`}
          </div>
        </div>
      </motion.div>

      <motion.div className='film-list'>{renderFilms}</motion.div>
    </>
  )
}

export default FilmList
