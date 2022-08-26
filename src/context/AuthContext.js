// store user object in global state when user is logged in

import { createContext, useEffect, useReducer } from 'react'
import { auth } from '../firebase/config'

export const AuthContext = createContext()

// function for updating our state
export const authReducer = (state, action) => {
  // check action type
  // if the action type we pass through doesn't match any cases it just defaults to current state
  switch (action.type) {
    // when we dispatch a login action with the type of action we return a new obj to represent our state
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  })

  // check when user logs in or out
  // func will run anytime user auth state changes
  useEffect(() => {
    // communicate with firebase to tell us whenever theres some kind of change in auth status and when there is we want to fire this function
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
