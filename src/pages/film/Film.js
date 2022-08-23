import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataBase } from '../../firebase/config'

// Custom Hooks
import { useTheme } from '../../hooks/useTheme'

// Assets
import loader from '../../assets/loader.svg'

// Styling
import './Film.css'

function Film() {
  const { id } = useParams()
  const { color, mode } = useTheme()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // fetch data from firebase
  useEffect(() => {
    setLoading(true)
    const filmsCollection = dataBase.collection('films')
    const documentReference = filmsCollection.doc(id)

    // get single document by id from films collection
    // then method fires a func when the async task is completed and promise is resolved
    const unsub = documentReference.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setLoading(false)
        // update data state to be document data
        // doc.data() is a func that grabs the data and becomes a JS obj
        setData(snapshot.data())
        setError(false)
      } else {
        setLoading(false)
        setError('Could not find film')
      }
    })
    // cleanup func for when component unmounts
    return () => unsub()
  }, [id])

  return (
    <div className={`film ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {loading && (
        <div className='loader-container'>
          <img className='loading' src={loader} alt='loading...' />
        </div>
      )}
      {data && (
        <>
          <h2 className='page-title'>{data.title}</h2>
          <p>{data.genre}</p>
          <img src={data.filmImage} alt='poster artwork of film' />
          <a
            style={{ background: color }}
            href={data.link}
            target='_blank'
            rel='noreferrer'
          >
            Watch Trailer
          </a>
          <p>{data.description}</p>
          {/* <img 
          className='edit-icon' 
          onClick={() => history.push(`/edit/${id}`)}
          src={editIcon} 
          alt='edit icon' 
        /> */}
        </>
      )}
    </div>
  )
}

export default Film
