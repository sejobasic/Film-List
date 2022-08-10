import React, { useEffect, useState } from 'react'
import { dataBase } from '../../firebase/config'
import loader from '../../assets/loader.svg'
import FilmList from '../../components/FilmList'
import { useTheme } from '../../hooks/useTheme'
import './Home.css'

function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [deletedFilm, setDeletedFilm] = useState(false)

  const { mode } = useTheme()

  useEffect(() => {
    setLoading(true)

    // get all documents from films collection
    // onSnapshot sends us current state of collection, it is used for real time collection data
    // When deleting an item the snapshot fires up again and goes through all documents and updates local state to match those current docs which would not include the deleted doc
    const unsub = dataBase.collection('films').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No Films Found')
          setLoading(false)
        } else {
          if (snapshot.docChanges()[0]._delegate.type === 'removed') {
            setDeletedFilm(true)
            setTimeout(() => {
              setDeletedFilm(false)
            }, 3000)
          } else {
            setDeletedFilm(false)
          }
          let results = []
          // log each individual document
          // push single film into results array
          // spread the data obj into new obj with all data
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() })
          })
          // update local data to be results which will be an array of objs of each film
          setData(results)
          setError(false)
          setLoading(false)
        }
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    // cleanup func fires automatically when the component un-mounts(when going to diff page)
    // now if something changes in the collection this func will not run and update state due to cleanup
    return () => unsub()
  }, [])

  return (
    <div className='home'>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {loading && (
        <div className='loader-container'>
          <img className='loading' src={loader} alt='loading...' />
        </div>
      )}
      {data && <FilmList films={data} isDeleted={deletedFilm} />}
    </div>
  )
}

export default Home
