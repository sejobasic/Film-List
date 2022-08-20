import { useState } from 'react'
import { auth } from '../firebase/config'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // signup function to invoke after user clicks submit
  const signup = async (email, password, displayName) => {
    setError(null)
    setLoading(true)

    try {
      // signup user
      // store email and password in firebase
      const resp = await auth.createUserWithEmailAndPassword(email, password)
      

      // if resp is invalid throw error message
      if (!resp) {
        throw new Error('Could not complete signup at this time, please try again later')
      }

      // take the user that just signed up and update their profile so they have a display name
      // add display name to user
      await resp.user.updateProfile({ displayName })

      setLoading(false)
      setError(null)

    }
    catch (err) {
      console.log(err.message)
      setError(err.message)
      setLoading(false)
    }
  }

  return { error, loading, signup }
}
