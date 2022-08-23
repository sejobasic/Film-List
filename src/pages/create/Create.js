import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion/dist/framer-motion'

// Custom Hooks
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTheme } from '../../hooks/useTheme'

// Styling
import './Create.css'

function Create() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [filmImage, setFilmImage] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')

  // Custom Hooks
  const { user } = useAuthContext()
  const { color, mode } = useTheme()
  const { addDocument, response } = useFirestore('films')

  //Query Parameters
  const history = useHistory()
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const action = queryParams.get('action')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const filmToAdd = addDocument({
      uid: user.uid,
      title,
      genre,
      filmImage,
      link,
      description,
    })
    if (action === 'create') {
      // Add a new document using add method passing in the doc obj which will generate a new doc inside the films collection and adds a unique id
      try {
        await filmToAdd
        history.push({
          pathname: '/',
          state: { addedFilm: filmToAdd },
        })
        // fire catch block if error is found
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    // reset add film form if the success property on the response obj is true
    // redirect user to home
    if (response.success) {
      setTitle('')
      setGenre('')
      setFilmImage('')
      setLink('')
      setDescription('')
      history.push({
        pathname: '/',
      })
    }
  }, [response.success, history])

  // animate functions for form component
  const formVariant = {
    hidden: {
      opacity: 0,
      y: '-100vh',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        delay: 0.5,
        duration: 1,
      },
    },
  }

  return (
    <motion.div
      className={`create ${mode}`}
      variants={formVariant}
      initial='hidden'
      animate='visible'
    >
      <h2 className='page-title'>
        {action === 'create' ? 'Add Film' : 'Update Film'}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Film Title:</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            disabled={action !== 'create' && !title}
          />
        </label>
        <label>
          <span>Film Genre:</span>
          <input
            type='text'
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            required
            disabled={action !== 'create' && !genre}
          />
        </label>
        <label>
          <span>Film Poster URL:</span>
          <input
            type='text'
            onChange={(e) => setFilmImage(e.target.value)}
            value={filmImage}
            required
            disabled={action !== 'create' && !filmImage}
          />
        </label>
        <label>
          <span>Film Trailer URL:</span>
          <input
            type='text'
            onChange={(e) => setLink(e.target.value)}
            value={link}
            required
            disabled={action !== 'create' && !link}
          />
        </label>
        <label>
          <span>Film Description:</span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            disabled={action !== 'create' && !description}
          />
        </label>

        <button className='btn' style={{ background: color }}>
          {action === 'create' ? 'Submit' : 'Update'}
        </button>
      </form>
    </motion.div>
  )
}

export default Create
