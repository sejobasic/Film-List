import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import './Home.css'


import loader from '../../assets/loader.svg'
import FilmList from '../../components/FilmList'

function Home() {
  const { data, loading, error } = useFetch('http://localhost:3000/films')

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {loading && (
        <div className='loader-container'>
          <img className='loading' src={loader} alt='loading...' />
        </div>
      )}
      {data && <FilmList films={data} />}
    </div>
  )
}

export default Home
