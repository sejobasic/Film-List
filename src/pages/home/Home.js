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

    // get all documents from films collection
    // onSnapshot sends us current state of collection
    // When deleting an item the snapshot fires up again and goes through all documents and updates local state to match those current docs which would not include the deleted doc
    const unsub = projectFirestore.collection('films').onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError('No Films Found')
          setLoading(false)
        } else {
          let results = []
          // log each individual document
          // push single film into results array
          // spread the data obj into new obj with all data
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() })
          })
          // update local data to be results which will be an array of objs of each film
          setData(results)
          setLoading(false)
        }
      }, (err) => {
          setError(err.message)
          setLoading(false)
        })

        // cleanup func fires automatically when the component un-mounts(when going to diff page)
        // now if something changes in the collection this func will not run and update state due to cleanup
        return () => unsub()


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
