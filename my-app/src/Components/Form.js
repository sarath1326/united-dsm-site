

import React from 'react'
import Navebar from './Navebar'
import "./Form.css"
import { useState } from 'react'
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom'


function Form() {
  

  const [cuname,setcuname]=useState("")
  const [mobile,setmobile]=useState("")
  const [brand,setbrand]=useState("")
  const [product,setproduct]=useState("")
  const [defectpart,setdefectpart]=useState("")
  const [date,setdate]=useState("")

  const navigate=useNavigate()

  const data={
    cuname,
    mobile,
    brand,
    product,
    defectpart,
    date
  }


 function addData(){

  axios.post("/post",data).then((responces)=>{

    alert(responces.data)

    navigate("/")



 
  })

    




  }




  return (
    <div>

        <Navebar />

        <div className='form-main'> 

        <div className='form' >

            <h4> Enter Data</h4>

            <div className='input-form' >

              <form>

            <input type='text' name='cuname' placeholder='coustmoer name' required="true" onChange={(e)=>{setcuname(e.target.value)}}/><br /><br/>

            <input type='text' name='mobile' placeholder='mobile no' required="true" onChange={(e)=>{setmobile(e.target.value)}} /><br/><br/>

            <input type='text' name='barnd' placeholder='barnd' required="true" onChange={(e)=>{setbrand(e.target.value)}}  /><br/><br/>
            

            <input type='text' name='product' placeholder='product' required="true" onChange={(e)=>{setproduct(e.target.value)}} /><br/><br/>

            <input type='text' name='defectpart' placeholder='Defect part' required="true" onChange={(e)=>{setdefectpart(e.target.value)}} /><br/><br/>

            <input type='date' name='date' placeholder='enter date' required="true" onChange={(e)=>{setdate(e.target.value)}} /><br/><br/>

                
               
               </form>

               <button className='btn-form' onClick={addData}> submit</button>
             
              </div>


        </div>









        </div>








    </div>
  )
}

export default Form