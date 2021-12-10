import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import PlantShow from './components/PlantShow'
import Profile from './components/Profile'
import Community from './components/Community'


const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/plants/:id' component={PlantShow} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/community' component={Community} />
      </Switch>
    </BrowserRouter>
  )

}

export default App