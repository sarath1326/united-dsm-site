


import React from 'react'
import "./Otp_enter.css"
import { useState,useRef } from 'react'
import axios from "../constant/Axios"
import {message } from "antd"
import { useNavigate } from 'react-router-dom'


function Otp_enter() {

  const navigate=useNavigate()
  const inputRef=useRef({})

   const [otpdata,setotpdata]=useState("")

  const [otp,setotp]=useState('')
  
  const [input,setinput]=useState({

    input1:"",
    input2:"",
    input3:"",
    input4:"",
    input5:"",
    input6:"",
  
  })

  


    function sendotp(e){       // otp number send to  server
    
    e.preventDefault()

    const data=""+input.input1+""+input.input2+""+input.input3+""+input.input4+""+input.input5+""+input.input6

    console.log(data)
    
    axios.post("/otpverifi",{otp:data}).then((respo)=>{
       
     if(respo.data.varifi){

       navigate("/login");

       }else{

       message.error("invalid otp");
     
     };


    });  

    };


      // this method use to get value in input fileds

    const handilChange=(event,index)=>{

      const {name,value}=event.target ;

       if(/[a-z]/gi.test(value)) return ;



       setinput((prev)=>({
          ...prev,
          [name]:value
        
        })
        );
        
        if( value  &&  index<5){

          inputRef.current[index+1].focus();

        };

         };


         const handilBackSpaca=(event,index)=>{

          if(event.key==="Backspace"){

           if(index >0){
            inputRef.current[index-1].focus()
           }
            

          }

         }

           
            // input filed daynamic render method
           
            const inputRender=()=>{

            return Object.keys(input).map((key,index)=>(

            <input className='input-otp' required={true}  name={key} value={input[key]}   type='text' maxLength={1}
             
            onChange={(event)=>handilChange(event,index)} 
             
             ref={(element)=>(inputRef.current[index]=element)}

             onKeyUp={(event)=>{handilBackSpaca(event,index)}}


             
             />  
            
            ));
          };






          return (

   <div className='main-box-otp'>

    <section>
      <div className='title1-otp'>OTP </div>

      <div className='title2-otp'>Enter Verification code </div>
      <p className='p-otp'> We have sent a Verification code to your email id</p>

      <div className='inputs-otp'>

      <form onSubmit={sendotp}   >

      
      {
       
        inputRender()

      }
      
     <button  className='btn-otp'    >Submit </button>
   
       </form>

      </div>

   
   </section>
   
   </div>
  )
}

export default Otp_enter
