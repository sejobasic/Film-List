import { useEffect, useState } from 'react'
import { dataBase } from '../firebase/config'

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null)
  const [collectionError, setCollectionError] = useState(null)

  // real time listener on firestore collection data
  useEffect(() => {
    let ref = dataBase.collection(collection)

    // fire func anytime we get a snapshot from the collection
    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        // create a new document obj for each document that we have
        results.push({ ...doc.data(), id: doc.id })
      })

      // update state
      setDocuments(results)
      setCollectionError(null)
    }, (error) => {
      console.log(error)
      setCollectionError('could not fetch the data')
    })

    // unsubscribe on unmount
    // when we are not on page we are no longer listening for snapshot events
    return () => unsubscribe()

  }, [collection])

  return { documents, collectionError }
}