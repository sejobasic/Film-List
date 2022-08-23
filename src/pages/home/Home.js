import React, { useEffect, useState } from 'react'
import { dataBase } from '../../firebase/config'
import { useCollection } from '../../hooks/useCollection'
import loader from '../../assets/loader.svg'
import FilmList from '../../components/film-list/FilmList'
import { useTheme } from '../../hooks/useTheme'
import './Home.css'
import { useAuthContext } from '../../hooks/useAuthContext'

function Home() {

  const { user } = useAuthContext()
  const { mode } = useTheme()
  const { documents, collectionError, deletedFilm, loading } = useCollection(
    'films',
    // these our the query strings for our firebase collection to locate data based off users id
    ['uid', '==', user.uid],
    ['createdAt', 'desc']

    )


  return (
    <div className='home'>
      {collectionError && <p className={`error ${mode}`}>{collectionError}</p>}
      {loading && (
        <div className='loader-container'>
          <img className='loading' src={loader} alt='loading...' />
        </div>
      )}
      {documents && <FilmList films={documents} isDeleted={deletedFilm} />}
    </div>
  )
}

export default Home
