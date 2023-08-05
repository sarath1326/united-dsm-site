



import React from 'react'
import "./Category.css"
import Table from 'react-bootstrap/Table';
import { BsTrash3Fill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import Navebar from './Navebar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials=true

function Category() {
  
  const [filterbox,setfilterbox]=useState(false)
  const [fetchdata,setfetchdata]=useState([])
  const [fillterdata,setfillterdata]=useState([])

  const navigate=useNavigate();

    
    useEffect(()=>{

      axios("/view/cat1").then((result)=>{

        if(result.data.notlogin){

          navigate('/login');

        }

          setfetchdata(result.data);
          setfillterdata(result.data);

        

      });

      

    },[]);

    function fillter(value){
      
      console.log(value)

      const res=fillterdata.filter(obj=>obj.cuname.toLowerCase().includes(value) || obj.mobile.includes(value)   )

      

      setfetchdata(res)
     
      // console.log(res);

    }

    console.log(fetchdata);



    
    
  return (
    <div  >

      <Navebar/>




      <div className='main'>

        <div className='   box'> 

        

        <h1>LLoyd </h1>


        <div className='input-div'>   

        <input type='text' placeholder='Search here' onChange={e=>fillter(e.target.value)}   /> 

          <span className='span' onClick={()=>{setfilterbox(!filterbox)}}> <FiFilter/>   </span>
          <span className='filter-opt'>all </span>

         {
            filterbox ?

         <div className='filter-box1' >

          <h6> All</h6>
          <hr></hr>
          <h6>Lloyd</h6>

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
                     <th>{index+1}</th>  
                    <td>{obj.cuname}</td>
                    <td> {obj.mobile}</td>
                    <td> {obj.brand}</td>
                    <td>{obj.product}</td>
                    <td>{obj.defectpart}</td>
                    <td> {obj.date}</td>
                    <td> <input type='checkbox'/></td>
                    <td id='icon'> <BsTrash3Fill/> </td>
                      </tr>





            )

          )


          


                

          } 
                      
                      
                      
                      </tbody>

                      </Table>






          










      </div>
       

        

       

        
        
        
        {/* <div  className=''>


        <Table striped bordered hover className='container'>

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

                <tr>
                     <th> 1</th>  
                    <td>sarath</td>
                    <td> 7592831937</td>
                    <td> lloyd</td>
                    <td>ac</td>
                    <td>coil</td>
                    <td> 20/5/23</td>
                    <td> <input type='checkbox'/></td>
                    <td id='icon'> <BsTrash3Fill/> </td>
                      </tr>

                      
                      
                      
                      
                      </tbody>

                      </Table>




              













        </div> */}















    </div>
  )
}

export default Category