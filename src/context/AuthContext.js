// store user object in global state when user is logged in

import { createContext, useReducer } from 'react'

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
      return { ...state, user: null}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
