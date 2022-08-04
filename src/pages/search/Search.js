import React from 'react'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import FilmList from '../../components/FilmList'
import './Search.css'


function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const url = `http://localhost:3000/films?q=${query}`
  const { error, loading, data } = useFetch(url)


  return (
    <div>
      <h2 className="page-title">Films Including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      {data && <FilmList films={data}/>}
    </div>
  )
}

export default Search