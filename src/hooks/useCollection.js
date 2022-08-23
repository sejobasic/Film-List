import { useEffect, useRef, useState } from 'react'
import { dataBase } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [collectionError, setCollectionError] = useState(null)

  // when we wrap a ref type in useRef it doesn't see it as a different on every component
  // if we dont use a ref then we get infinite loop in useEffect
  // _query is an array and is 'different' on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  // real time listener on firestore collection data
  useEffect(() => {
    let ref = dataBase.collection(collection)

    // if we have a value on the query array we attach that value to our ref
    // only send us documents where the User id property is equal to that doc
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

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
      setCollectionError('No Films Found')
    })

    // unsubscribe on unmount
    // when we are not on page we are no longer listening for snapshot events
    return () => unsubscribe()

  }, [collection, query, orderBy])

  return { documents, collectionError }
}