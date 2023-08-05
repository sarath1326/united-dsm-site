

import React from 'react'
import "./Signup.css"
import { useState } from 'react'
import axios from "../constant/Axios"

function Signup() {

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