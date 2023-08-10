



import React from 'react'
import "./Category.css"
import Table from 'react-bootstrap/Table';
import { BsTrash3Fill,BsSend } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import Navebar from './Navebar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import {message } from "antd" 
 
import { BiSolidErrorAlt } from "react-icons/bi"; 


axios.defaults.withCredentials=true

function Category() {
  
  const [filterbox,setfilterbox]=useState(false)
  const [fetchdata,setfetchdata]=useState([])
  const [fillterdata,setfillterdata]=useState([])
  const [alert,setalert]=useState(false)
  const [dataid,setdataid]=useState("")
  const [check,setcheck]=useState(false)
  const [indexvalue,setindexvalue]=useState("")

  const navigate=useNavigate();

     
    useEffect(()=>{

      axios("/view/cat1",{

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
         
         
            setfetchdata(result.data,{partretun:false});
          
          setfillterdata(result.data);


           } else {

           
            navigate("/")
          
          }


         });

      

    }, [] );

    function fillter(value){
      
      console.log(value)

      const res=fillterdata.filter(obj=>obj.cuname.toLowerCase().includes(value) || obj.mobile.includes(value)   )

      

      setfetchdata(res)
     
      // console.log(res);

    }

    console.log(fetchdata);


    function return_marking(id,index){

      setalert(true)
      setdataid(id)
      setindexvalue(index)

     }

     function sendapi(){

      const id=dataid
      const index=indexvalue


      axios("/partsend?id="+id).then((respo)=>{

          if(respo){

            setcheck(true)
            setalert(false)

            fetchdata[index].retunmark = true 
            
            message.success("Part retun marking Sucssfully...!")


          }else{

            setcheck(false)
            setalert(false)
            message.success("Part retun marking Failed...!")



          }  


      })

     



     }


     function deletepart(id,date,retundate){

      if(!retundate){
        
        message.error("this part not return.not delete")

        return 

        
      }else{


        const repartdate="08/1/2023"

       

        let today = new Date();
        let year = today.getFullYear();
        let mon = today.getMonth()+1;
        let day = today.getDate();
        
        let cudate =mon+"-"+day+"-"+year;

        let redate= new Date(repartdate)

        let curentdate= new Date(cudate)


        let Difference_In_Time = curentdate.getTime() - redate.getTime();
      
   
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


        console.log(Difference_In_Days)

         }


         if(Difference_In_Days >= 7){

             message.success("data deleted")



         }else{

          message.error("data deleted failed")

         }

         
        
      




     }

    
     
    
    
    
    



   


    
    
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
                    
                   <td>   { obj.retunmark ? <>   <GiCheckMark className='tick-mark' />  <span>{obj.retundate}</span>  </>

                   
                   : <BsSend className='tick-mark' onClick={()=>{return_marking(obj._id,index)}} /> }  </td>
                   
                    
                    
                    
                    
                    <td id='icon' onClick={()=>{deletepart(obj._id,obj.date,obj.retundate) }}    > <BsTrash3Fill/> </td>
                  
                      </tr>
                      





            )

          )


          


                

          } 
                      
                      
                      
                      </tbody>

                      </Table>


            {   
            
            alert &&

           <div className='alert-box'>

            <div className='icon-alert-main'>

              <BiSolidErrorAlt className='waring-icon' />

            </div>

            <h4> Are you sure this defect part sent to Return</h4>

           <div className='btngroup'>            
            
            <button className='btn-back' onClick={()=>{setalert(false)}}   >Get Back</button>
           
           <button className='btn-conf' onClick={sendapi}   >conform</button>

           </div>

            </div> 

            

}
 


          










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