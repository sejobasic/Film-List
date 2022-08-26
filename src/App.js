import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'

// Pages and Components
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Create from './pages/create/Create'
import Film from './pages/film/Film'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import ThemeSelector from './components/theme-selector/ThemeSelector'
import Loader from './pages/pre-loader/Loader'
import Update from './pages/update/Update'

// Custom Hooks
import { useTheme } from './hooks/useTheme'
import { useAuthContext } from './hooks/useAuthContext'

// Styling
import './App.css'
import Footer from './components/footer/Footer'

function App() {
  const [loading, setLoading] = useState(false)

  // Custom Hooks
  const { authIsReady, user } = useAuthContext()
  const { mode } = useTheme()

  // animate functions for navbar component
  const appVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1,
      },
    },
  }

  // render pre-loader page first
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            className={`App ${mode}`}
            variants={appVariant}
            initial='hidden'
            animate='visible'
          >
            {authIsReady && (
              <BrowserRouter>
                {user && <Navbar />}
                {user && <ThemeSelector />}
                <Switch>
                  <Route exact path='/login'>
                    {user && <Redirect to='/' />}
                    {!user && <Login />}
                  </Route>
                  <Route exact path='/signup'>
                    {user && <Redirect to='/' />}
                    {!user && <Signup />}
                  </Route>
                  <Route exact path='/'>
                    {/* If we don't have a user logged in redirect them to login page otherwise show home page */}
                    {!user && <Redirect to='/login' />}
                    {user && <Home />}
                  </Route>
                  <Route exact path='/search'>
                    {!user && <Redirect to='/login' />}
                    {user && <Search />}
                  </Route>
                  <Route exact path='/create'>
                    {!user && <Redirect to='/login' />}
                    {user && <Create />}
                  </Route>
                  <Route exact path='/edit/:id'>
                    {!user && <Redirect to='/login' />}
                    {user && <Update />}
                  </Route>
                  <Route exact path='/films/:id'>
                    {!user && <Redirect to='/login' />}
                    {user && <Film />}
                  </Route>
                </Switch>
              </BrowserRouter>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
