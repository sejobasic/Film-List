import { useReducer, useEffect, useState } from 'react'
import { dataBase, timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isLoading: true,
        document: null,
        success: false,
        error: null,
      }
    case 'ADDED_DOCUMENT':
      return {
        isLoading: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'DELETED_DOCUMENT':
      return {
        isLoading: false,
        document: null,
        success: true,
        error: null,
      }
    case 'UPDATED_DOCUMENT':
      return {
        isLoading: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'ERROR':
      return {
        isLoading: false,
        document: null,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = dataBase.collection(collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add new document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      // This func takes the current date at the time of adding a new document and passes the date to the timestamp object which creates a new firebase timestamp and stores it in createdAt
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })

      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS FILM?')) {
        await ref.doc(id).delete()
        dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
      }
    } catch (err) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: 'could not delete film',
      })
    }
  }

  //update documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      })
      return updatedDocument
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  // cleanup func
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}
