

import React from 'react'
import Navebar from './Navebar'
import "./Login.css"
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidErrorAlt } from "react-icons/bi";
import { useState } from 'react';
import axios from "../constant/Axios"
import {  useNavigate } from 'react-router-dom';

function Login() {


  axios.defaults.withCredentials=true

  const [username,setusername]=useState('');
  const [password,setpassword]=useState('' );
  const [erricon,seterricon]=useState(false)

  const navigate=useNavigate()

  const data={
    username,
    password
  }


   function login(e){

    e.preventDefault();

       axios.post("/login",data).then((result)=>{

       
       if(result.data.check){

        console.log(result.data)

        const jwttoken= result.data.jwttoken

        
        localStorage.setItem("token" ,jwttoken)
        
        navigate('/')
      
        
        }else{
          
         navigate("/login")
         
         seterricon(true)
         setusername('')
         setpassword('')
        
       
        }



       })

   }
      



  return (
    <div>

        <Navebar />

        <div className='main-login'>

            <div className='formbox-login'>

              <BsFillPersonFill className='icon-login' />

                <h2> Login </h2>

                <form className='form-login' onSubmit={login}>


                    
                    <input type='text' name='username' placeholder="username"
                     
                     required={true}
                     value={username}
                    onChange={(e)=>{setusername(e.target.value)}} 
                    
                    />  {  erricon ? <BiSolidErrorAlt className='erricon' />  : null  }
                    
                     
                    <br/><br/>

                    
                    
                    
                    
                    <input type='password' name='password' placeholder='password' 
                    
                    required={true}
                    value={password} 
                    onChange={(e)=>{setpassword(e.target.value)}} 
                    
                    />

                      { erricon ? <BiSolidErrorAlt className='erricon' /> : null   }
                    
                    
                    
                    <br/><br/>

                    
                    
                    <button className='btn-login'   > Login</button><br/>

                 
                  </form>

                 
                  <a className='a'> change your password ? </a>






            </div>







        </div>











    </div>
  )
}

export default Login