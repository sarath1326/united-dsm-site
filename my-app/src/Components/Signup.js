

import React from 'react'
import "./Signup.css"
import { useState } from 'react'
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom'
import {message } from "antd" 

function Signup() {
     
  const navigate=useNavigate()
  
  const [name,setname]=useState('');
  const [mobile,setmobile]=useState('');
  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');

   const data={
    name,
    mobile,
    username,
    password

   }

   
  function signup(){

    axios.post("/signup",data).then((respo)=>{

      if(respo.data.signup){

        navigate("/otp")
      
      }else{

        navigate("/sig")
        message.error("this email id alrady exsist...! plz try another one")
      
      }

      

    })





    



  };





  return (
    <div className='main-sig'>

        <div>

        <form>

         <input type='text' placeholder='name' name='name' onChange={(e)=>{setname(e.target.value)}}   /><br/><br/>

         <input type='text' placeholder='mobile no' name='mobile' onChange={(e)=>{setmobile(e.target.value)}}   /><br/><br/>

         <input type='text' placeholder='username or email id' name='username' onChange={(e)=>{setusername(e.target.value)}}   /><br/><br/>

         <input type='password' placeholder='password' name='password' onChange={(e)=>{setpassword(e.target.value)}}   /><br/><br/>

         </form> <br/>

         <button className='btn-sig' onClick={signup}> signup </button>

         </div>






    </div>
  )
}

export default Signup