import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setLoading(true)

    // sign the user out
    try {
      await auth.signOut()

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      // only update our state when setIsCancelled is false
      if (!isCancelled) {
        setLoading(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setLoading(false)
      }
    }
  }

  // cleanup function
  // when component unmounts we are not allowing state to be updated
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, setLoading }
}
