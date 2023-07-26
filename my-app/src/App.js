




import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './Components/Home'
import Category from './Components/Category';
import Category2 from './Components/Category2';
import Category3 from './Components/Category3';
import Form from './Components/Form';
import Login from './Components/Login';



function App() {

  
  return (
   
   <div>

    <Router>

      <Routes>
       


      <Route element={<Home/>} path='/' />

      <Route element={<Category/>} path='/cat' />

      <Route element={<Category2 />} path='/cat2' />

      <Route element={<Category3 />} path='/cat3' />

      <Route element={ <Form />} path='/form'   />

      <Route  element={ <Login />} path='/login'/>

      </Routes>

      


   
  

  
  

 </Router>

    </div>
  
  
  
    )
}

export default App
