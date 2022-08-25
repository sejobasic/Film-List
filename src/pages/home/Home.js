import React from 'react'

// Custom Hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTheme } from '../../hooks/useTheme'

// Assets
import loader from '../../assets/loader.svg'
import FilmList from '../../components/film-list/FilmList'

// Styling
import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import ThemeSelector from '../../components/theme-selector/ThemeSelector'

function Home() {

  // Custom Hooks
  const { user } = useAuthContext()
  const { mode } = useTheme()
  const { documents, collectionError, deletedFilm, loading } = useCollection(
    'films',
    // these our the query strings for our firebase collection to locate data based off users id
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )

  return (
    <>
    {/* <Navbar /> */}
    {/* <ThemeSelector /> */}
      <div className='home'>
        {collectionError && <p className={`error ${mode}`}>{collectionError}</p>}
        {loading && (
          <div className='loader-container'>
            <img className='loading' src={loader} alt='loading...' />
          </div>
        )}
        {documents && <FilmList films={documents} isDeleted={deletedFilm} />}
      </div>
    </>
  )
}

export default Home
