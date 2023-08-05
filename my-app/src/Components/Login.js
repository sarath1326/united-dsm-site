

import React from 'react'
import Navebar from './Navebar'
import "./Login.css"
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidErrorAlt } from "react-icons/bi";
import { useState } from 'react';
import axios from "../constant/Axios"
import {  useNavigate } from 'react-router-dom';

function Login() {

  const [username,setusername]=useState('');
  const [password,setpassword]=useState('' );
  const [erricon,seterricon]=useState(false)

  const navigate=useNavigate()

  const data={
    username,
    password
  }


   function login(){

       axios.post("/login",data).then((result)=>{

       
       if(result.data.check){
            
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

                <form className='form-login'>


                    
                    <input type='text' name='username' placeholder="username"
                     
                     value={username}
                    onChange={(e)=>{setusername(e.target.value)}} 
                    
                    />  {  erricon ? <BiSolidErrorAlt className='erricon' />  : null  }
                    
                     
                    <br/><br/>

                    
                    
                    
                    
                    <input type='password' name='password' placeholder='password' 
                    value={password} 
                    onChange={(e)=>{setpassword(e.target.value)}} 
                    
                    />

                      { erricon ? <BiSolidErrorAlt className='erricon' /> : null   }
                    
                    
                    
                    <br/><br/>

                    
                    
                   
                 
                  </form>

                  <button className='btn-login' onClick={login}   > Login</button><br/>

                  <a className='a'> change your password ? </a>






            </div>







        </div>











    </div>
  )
}

export default Login