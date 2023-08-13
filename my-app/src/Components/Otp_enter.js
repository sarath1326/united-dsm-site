


import React from 'react'
import "./Otp_enter.css"
import { useState } from 'react'
import axios from "../constant/Axios"
import {message } from "antd"
import { useNavigate } from 'react-router-dom'

function Otp_enter() {

  const navigate=useNavigate()

  const [otp,setotp]=useState('')


     function sendotp(){

         axios.post("/otpverifi",{otp:otp}).then((respo)=>{
            
          if(respo.data.varifi){

            navigate("/login")



          }else{

            message.error("invalid otp")
          
          }


         })  


     }




  
  
    return (

   <div>


      <input type='text' placeholder=' enter otp number  'name='otp'   onChange={(e)=>{setotp(e.target.value)}} /> <br/>

      
      <button onClick={sendotp} > submit </button>







    </div>
  )
}

export default Otp_enter
