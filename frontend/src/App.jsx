import { Routes, Route } from "react-router-dom";
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'

function App() {
  


  return (
    <>
  <Routes>
    <Route  path = "/login"  element = {<Login />} > </Route>
    <Route  path = "/signup"  element = {<Signup />} > </Route>
  </Routes>
    </>
  )
}

export default App
