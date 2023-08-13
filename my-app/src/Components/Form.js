

import React from 'react'
import Navebar from './Navebar'
import "./Form.css"
import { useState } from 'react'
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom'
import {message } from "antd" 


function Form() {
  

  const [cuname,setcuname]=useState("")
  const [mobile,setmobile]=useState("")
  const [brand,setbrand]=useState("")
  const [product,setproduct]=useState("")
  const [defectpart,setdefectpart]=useState("")
  const [date,setdate]=useState("")
  const [retunmark,setretunmark]=useState(false)
  const [retundate,setretundate]=useState("")
 

  const navigate=useNavigate()

  const data={
    cuname,
    mobile,
    brand,
    product,
    defectpart,
    date,
    retunmark,
    retundate
  }


 function addData(){

  axios.post("/post",data).then((responces)=>{

    if(responces){

      navigate("/")
     
      message.success("data added sucssfully...!")

    }else{


      message.error("something worng...! data adding failed")



    }

    
   

 
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

            <input className='input' type='text' name='cuname' placeholder='coustmoer name' required="true" onChange={(e)=>{setcuname(e.target.value)}}/>

            <input className='input' type='text' name='mobile' placeholder='mobile no' required="true" onChange={(e)=>{setmobile(e.target.value)}} />

            <input className='input' list='branddata' name='barnd' placeholder='barnd' required="true" onChange={(e)=>{setbrand(e.target.value)}}  />
            

            <datalist id='branddata'>

              <option value={"LLoyd"} />
              <option value={"blueberry"} />
              <option value={"amstard"} />
              <option value={"carrier"} />
              <option value={"onida"} />
              <option value={"Akiva"} />



            </datalist>







            <input className='input' list='prodata' name='product' placeholder='product' required="true" onChange={(e)=>{setproduct(e.target.value)}} />

                     <datalist id='prodata'>

                      <option value={"AC"}   />
                      <option value={"TV"}   />
                      <option value={"Wm"}   />
                      <option value={"gas-other"}   />
                      





                     </datalist>
            
            
            
            <input className='input' type='text' name='defectpart' placeholder='Defect part' required="true" onChange={(e)=>{setdefectpart(e.target.value)}} />

           
            <input className='input' type='date' name='date' placeholder='enter date' required="true" onChange={(e)=>{setdate(e.target.value)}} />

           

                
               
               </form>

               <button className='btn-form' onClick={addData}> submit</button>
             
              </div>


        </div>









        </div>








    </div>
  )
}

export default Form