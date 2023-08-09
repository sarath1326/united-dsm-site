



import React from 'react'
import "./Category2.css"

import Table from 'react-bootstrap/Table';
import { BsTrash3Fill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import Navebar from './Navebar';
import { useState,useEffect } from 'react';
import  axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom';

function Category2() {

    const [filterbox,setfilterbox]=useState(false)
    const [filteropt,setfilteropt]=useState("all")
    const [fetchdata,setfetchdata]=useState([])
    const [fillterdata,setfillterdata]=useState([])

    const navigate=useNavigate()



     function bb(value){

        setfilteropt(value)

     }


     useEffect(()=>{axios("/view/cat2",{

        headers:{

          "jwt-token" :localStorage.getItem("token")

        }
      
      }).then((result)=>{


        
        const fetchdata=result.data

        console.log("fetchdata",fetchdata)


        if(fetchdata.faildauth){

          navigate("/login")   
        
        
        }else if(fetchdata.details.flag){

           const result=fetchdata.details
         
         
            setfetchdata(result.data);
          
          setfillterdata(result.data);


           } else {

           
            navigate("/")
          
          }


         });

        






     },[])

     function fillter(value){

          const res= fillterdata.filter(obj=>obj.cuname.toLowerCase().includes(value) || obj.mobile.includes(value)   )

          setfetchdata(res)


     }





  
    return (
    <div>



        
      <Navebar/>




<div className='main'>

  <div className='   box'> 

  

  <h1> blueberry , carrier  </h1>


  <div className='input-div'>   

  <input type='text' placeholder='Search here' onChange={(e)=>{fillter(e.target.value)}}  /> 

    <span className='span' onClick={()=>{setfilterbox(!filterbox)}}> <FiFilter/>   </span>
    <span className='filter-opt'>{filteropt} </span>

   {
      filterbox ?

   <div className='filter-box' >

    <h6> All</h6>
    <hr></hr>
    <h6 onClick={()=>{bb("blueberry's")}}>blueberry's </h6>
    <hr></hr>
    <h6>Career</h6>

    </div>

    : null

   }

   

 
  </div>

  </div>


  <Table striped bordered hover className='container  '>

      <thead>
          <tr>

              <th> no</th>
              <th>customer name</th>
              <th> mobile no</th>
              <th>brand  </th>
              <th>product</th>
              <th> defect part</th>
              <th> enter date</th>
              <th> return marking</th>
              <th> Delete</th>
            
            </tr>

         </thead>
         <tbody>



          {

          fetchdata.map((obj,index)=>
          
           (


            <tr>
               <th> {index+1}</th>  
              <td>{obj.cuname }</td>
              <td> {obj.mobile}</td>
              <td> {obj.brand}</td>
              <td>{obj.product}</td>
              <td>{obj.defectpart}</td>
              <td>{obj.date}20/5/23</td>
              <td> <input type='checkbox'/></td>
              <td id='icon'> <BsTrash3Fill/> </td>
                </tr>


                  )
          
                   )
          
                }

              </tbody>

                </Table>






    










</div>
 






      
    
    
    
    
    
    </div>
  )
}

export default Category2
