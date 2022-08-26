import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

// When theme func is called using the dispatch func, takes in two args,
// the current up to date state and the action obj we passed into the dispatch call
// Then we use both of those two things to update the state
// Check the type of state change we want to make and then return an updated state based on that
// Using a switch statement we check the type property of the action obj and
// then based on diff types will return diff values
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      // Updated state obj
      return { ...state, color: action.payload }
    // Need default case to pass back a default value in case none of the cases matched
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: '#3d405b',
    mode: 'light',
  })

  // Custom logic

  // Dispatch function is a way we can dispatch a state change to the reducer function

  // Dispatch func takes in an obj as an argument which is referred to as the dispatch action
  // The type property describes the type of state change we want to make
  // Payload is any data we want to base the state change on in this case passing the new color as the payload value

  // When we use the dispatch func react looks at the reducer func associated with that dispatch and
  // finds our theme reducer func and then fires that func to make the state change inside it
  const changeColor = (color) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color })
  }

  const changeMode = (mode) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
