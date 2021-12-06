import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import PlantShow from './components/PlantShow'


// import axios from 'axios'


const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/plants/:id' component={PlantShow} />
      </Switch>
    </BrowserRouter>
  )

}

export default App



// ? What was originally in this file in the create-react-app template:
// function App() {
//   React.useEffect(() => {
//     const getData = async () => {
//       const res = await axios.get('/api/plants') // * <-- replace with your endpoint
//       console.log(res.data)
//     }
//     getData()
//   })

//   return <h1>Hello World</h1>
// }

// export default App