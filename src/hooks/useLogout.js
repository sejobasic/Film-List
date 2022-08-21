import { useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
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

      setLoading(false)
      setError(null)
    }
    catch(err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return { logout, error, setLoading }
}