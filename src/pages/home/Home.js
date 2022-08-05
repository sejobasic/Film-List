import React, { useEffect, useState } from 'react'
import { projectFirestore } from '../../firebase/config'
import loader from '../../assets/loader.svg'
import FilmList from '../../components/FilmList'
import './Home.css'

function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)

    projectFirestore.collection('films').get().then((snapshot) => {
      if (snapshot.empty) {
        setError('No Films Found')
        setLoading(false)
      } else {
        let results = []
        // log each individual document 
        // push single film into results array
        // spread the data obj into new obj with all data
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        // update local data to be results which will be an array of objs of each film
        setData(results)
        setLoading(false)
      }
    }).catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [])

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
