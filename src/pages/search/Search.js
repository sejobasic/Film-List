import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import FilmList from '../../components/film-list/FilmList'
import './Search.css'

//Firestore
import { dataBase } from '../../firebase/config'

function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const { mode } = useTheme()

  const [films, setFilms] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setIsLoading] = useState(false)

  // Get documents from collection based on search query, push found docs to new array
  useEffect(() => {
    setIsLoading(true)
    setFilms(null)
    const collectionRef = dataBase.collection('films')
    collectionRef.get().then((docs) => {
      let docArray = []
      docs.forEach((doc) => {
        if (doc.data().title.toLowerCase().includes(query.toLowerCase())) {
          docArray.push({ id: doc.id, ...doc.data() })
        }
      })
      setIsLoading(false)
      setFilms(docArray)
    })
  }, [query])

  return (
    <div>
      <h2 className={`page-title ${mode}`}>Films Including "{query}"</h2>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      {films && <FilmList films={films} />}
    </div>
  )
}

export default Search
