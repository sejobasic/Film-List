import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { dataBase } from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme'
import { motion } from 'framer-motion/dist/framer-motion'
import './Create.css'

function Create() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [filmImage, setFilmImage] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')

  const { color, mode } = useTheme()

  const history = useHistory()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = ({title, genre, filmImage, description})

    // Add a new document using add method passing in the doc obj which will generate a new doc inside the films collection and adds a unique id

    // fire catch block if error is found
    try {
      await dataBase.collection('films').add(doc)
      // Redirect user to home when we get data response
      history.push('/')
    }  catch(err) {
      console.log('error')
    }
  }

  // animate functions for form component
  const formVariant = {
    hidden: {
      opacity: 0,
      y: '-100vh'
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        delay: 0.5,
        duration: 1
      }
    }
  }

  return (
    <motion.div 
      className={`create ${mode}`}
      variants={formVariant}
      initial='hidden'
      animate='visible'
    >
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
          <span>Film Trailer URL:</span>
          <input
            type='text'
            onChange={(e) => setLink(e.target.value)}
            value={link}
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

        <button className='btn' style={{ background: color}}>Submit</button>
      </form>
    </motion.div>
  )
}

export default Create