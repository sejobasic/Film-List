import { useReducer, useEffect, useState } from 'react'
import { auth } from '../firebase/config'

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
        error: null 
      }
    case 'ADDED_DOCUMENT':
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
  const ref = auth.collection(collection)

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
      const addedDocument = await ref.add(doc)
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete document
  const deleteDocument = (id) => {}

  // cleanup func
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
