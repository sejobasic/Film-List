import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setLoading(true)

    // sign the user in
    try {
      const res = await auth.signInWithEmailAndPassword(email, password)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      // update state
      if (!isCancelled) {
        setLoading(false)
        setError(null)
      }
    }
    catch(err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, error, loading}
}