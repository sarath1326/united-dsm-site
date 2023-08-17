

import React from 'react'
import "./Signup.css"
import { useState } from 'react'
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom'
import {message } from "antd" 
import { Oval } from  'react-loader-spinner'

function Signup() {
     
  const navigate=useNavigate();
  
  const [name,setname]=useState('');
  const [mobile,setmobile]=useState('');
  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');
  const [namevalid,setnamevalid]=useState(false);
  const [mobvalid,setmobvalid]=useState(false);
  const [emailvalid,setemailvalid]=useState(false);
  const [passvalid,setpassvalid]=useState(false);
  const [loding,setloding]=useState(false)

   const data={
    name,
    mobile,
    username,
    password

   }

   
  function signup(e){

    e.preventDefault();

    setloding(true)

    axios.post("/signup",data).then((respo)=>{

      if(respo.data.signup){

        navigate("/otp");
      
      }else{

        navigate("/sig");
        message.error("this email id alrady exsist...! plz try another one");
      
      };

      

    });

};





  return (
    <div className='main-sig'>
       

        <div className='form-box-sig'>

        <div className='form-sig'>

        <p className='p-sig'> Create Account </p>

        <form onSubmit={signup}>

         <input className='input-sig' type='text' placeholder='name' name='name' 
         
         required
         pattern='[a-zA-Z].{2,20}'
         onBlur={()=>{setnamevalid(true)}}
         autocomplete="off"
          onChange={(e)=>{setname(e.target.value)}}   
         
         /><br/>

         { namevalid ? <span className='errspan-sig'> *enter more 3 char    </span> : null}
         
         <br/>

         <input className='input-sig'  type='text' placeholder='mobile no' name='mobile' 

                required
                pattern='.{10}'
                onBlur={()=>{setmobvalid(true)}}             
                autocomplete="off"
         onChange={(e)=>{setmobile(e.target.value)}}  
         
         /><br/>
         { mobvalid ? <span className='errspan-sig'> *enter valid number</span> : null}
         
         <br/>

         <input className='input-sig' type='text' placeholder=' email id' name='username'
         
         required
                
        onBlur={()=>{setemailvalid(true)}}
        autocomplete="off"
         onChange={(e)=>{setusername(e.target.value)}}   
         
         /><br/>
         
        { emailvalid ? <span className='errspan-sig'> *enter valid email id </span> : null} 
         
         <br/>

         <input className='input-sig' type='password' placeholder='password' name='password'
         
                required
                pattern='.{4,}'
                onBlur={()=>{setpassvalid(true)}}
                autocomplete="off"
         
         onChange={(e)=>{setpassword(e.target.value)}}   
         
         /><br/>
         
         { passvalid ? <span className='errspan-sig'> *enter more 4 char</span> : null}
         
         <br/>

         <button className='btn-sig'> signup </button>
         
         </form> <br/>
        
        <div className='loding'>
         { loding ?
         <Oval 
  height={50}
  width={50}
  
  color="black"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
   : null   }
</div>

         </div>

         </div>






    </div>
  )
}

export default Signup