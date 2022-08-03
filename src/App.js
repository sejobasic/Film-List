import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Page Components
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Create from './pages/create/Create';
import Film from './pages/film/Film';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/create'>
            <Create />
          </Route>
          <Route path='/films/:id' >
            <Film />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
