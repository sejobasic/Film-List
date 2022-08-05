import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import loader from '../../assets/loader.svg'
import { useTheme } from '../../hooks/useTheme'
import './Film.css'

function Film() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // fetch data from firebase
  useEffect(() => {
    setLoading(true)

    // get single document by id from films collection
    // then method fires a func when the async task is completed and promise is resolved
    projectFirestore.collection('films').doc(id).get().then((doc) => {
      if (doc.exists) {
        setLoading(false)
        // update data state to be document data
        // doc.data() is a func that grabs the data and becomes a JS obj
        setData(doc.data())
      } else {
        setLoading(false)
        setError('Could not find film')
      }
    })
  }, [])


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
          <p>{data.description}</p>
        </>
      )}
    </div>
  )
}

export default Film
