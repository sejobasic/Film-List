import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion'
// Page Components
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Create from './pages/create/Create'
import Film from './pages/film/Film'
import ThemeSelector from './components/theme-selector/ThemeSelector'
import { useTheme } from './hooks/useTheme'
import Loader from './pages/pre-loader/Loader'

function App() {
  const [loading, setLoading] = useState(false)
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
            <BrowserRouter>
              <Navbar />
              <ThemeSelector />
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/search'>
                  <Search />
                </Route>
                <Route exact path='/create'>
                  <Create />
                </Route>
                <Route exact path='/edit/:id'>
                  <Create />
                </Route>
                <Route exact path='/films/:id'>
                  <Film />
                </Route>
              </Switch>
            </BrowserRouter>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
