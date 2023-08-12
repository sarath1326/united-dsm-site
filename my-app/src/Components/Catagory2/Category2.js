



import React from 'react'
import "./Category2.css"

import Table from 'react-bootstrap/Table';
import { BsTrash3Fill,BsSend } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import Navebar from '../Navebar';
import { useState,useEffect } from 'react';
import axios from "../../constant/Axios"
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import {message } from "antd" 
import Dropdown from 'react-bootstrap/Dropdown';
import ReactPaginate from "react-paginate"
import { BiSolidErrorAlt } from "react-icons/bi"; 



axios.defaults.withCredentials=true;


function Category2() {

    
    const [filteropt,setfilteropt]=useState("all");
    const [fetchdata,setfetchdata]=useState([]);
    const [fillterdata,setfillterdata]=useState([]);
    const [alert,setalert]=useState(false);
   const [dataid,setdataid]=useState("");
   const [check,setcheck]=useState(false);
   const [indexvalue,setindexvalue]=useState("");
  


    const navigate=useNavigate();


       useEffect(()=>{axios("/view/cat2",{

        headers:{

          "jwt-token" :localStorage.getItem("token")

        }
      
      }).then((result)=>{


        
        // const fetchdata=result.data

        const resultdata=result.data

       


        if(resultdata.faildauth){

          navigate("/login") ;  
        
        
        }else if(resultdata.details.flag){

           const result=resultdata.details
         
           setfetchdata(result.data);
          
            setfillterdata(result.data);
          
             } else {

           
            navigate("/")
          
          }


         });

        },[])

     //search methode start //

     function search(value){

          const res= fillterdata.filter(obj=>obj.cuname.toLowerCase().includes(value) || obj.mobile.includes(value)   )

          setfetchdata(res)


     }

     //search method end //

     //filter method starting //


       function fillter(value){

        if(value=="all"){
          
          console.log("all");
          setfetchdata(fillterdata);
          
          setfilteropt("all");

        }else{

        const res= fillterdata.filter(obj=>obj.brand.toLowerCase().includes(value));

           if(res){
        
            setfetchdata(res);

            setfilteropt(value)
          
           };

          };
         };

         //fillter method end






      //defect part return marking code starting  //


      function return_marking(id,index){

        setalert(true);
        setdataid(id);
        setindexvalue(index);
  
       }
  
       function sendapi(){
          
        const id=dataid;
        const index=indexvalue;
  
         axios("/partsend?id="+id).then((respo)=>{
  
            if(respo){
  
              setcheck(true);
              setalert(false);
  
              fetchdata[index].retunmark = true 
              
              message.success("Part retun marking Sucssfully...!");
  
               }else{
  
              setcheck(false);
              setalert(false);
              message.success("Part retun marking Failed...!");
  
             }  
            
            })
  
          }
  
  
          // defect part return marking code end // 
  
         
          //defect part data delet code start //
       
       
          function deletepart(id,index,retundate){
  
            axios.delete("/delete",{data:{id:id,retundate:retundate}}).then((respo)=>{
  
               if(respo.data.noretdate){
             
                message.error("this part not retune");
                       return
  
                    }else if(respo.data.flag){
  
                    fetchdata.splice(index,1); 
                  
                    setfetchdata([...fetchdata]);
            
                  message.success("data deleted");
                   
                }else{
  
                      message.error("this part delete after 7 days");
  
                    };
  
                  });
  
                };
  
                //defect part data delet code end //
  
  
                //pagination code start//
  
             const [pageNumber,setPageNumber]=useState(0);
  
               const userPrePage=2;
             const pageVisited=pageNumber*userPrePage ;
  
             const pageCount=Math.ceil(fetchdata.length / userPrePage);
  
             const changePage = ({selected})=>{
  
              setPageNumber(selected);
  
             }
  
             const displyaData=fetchdata.slice(pageVisited, pageVisited+userPrePage)
             .map((obj,index)=>
             
             (
               <tr>
              {/* <td>{index+1}</td>   */}
             <td>{obj.cuname}</td>
             <td> {obj.mobile}</td>
             <td> {obj.brand}</td>
             <td>{obj.product}</td>
             <td>{obj.defectpart}</td>
             <td> {obj.date}</td>
             
            <td>   { obj.retunmark ? <>   <GiCheckMark className='tick-mark' />  <span>{obj.retundate}</span>  </>
  
            : <BsSend className='tick-mark' onClick={()=>{return_marking(obj._id,index)}} /> }  </td>
            
            <td id='icon' onClick={()=>{deletepart(obj._id,index,obj.retundate) }}    > <BsTrash3Fill/> </td>
           
               </tr>
               
  
              )) 
  
              //pagination code end //
  
  
  
  
  
  
  
    return (
   
   <div>



        
      <Navebar/>




<div className='main'>

  <div className='   box'> 

  

  <h1> blueberry , carrier  </h1>


  <div className='input-div'>   

  <input type='text' placeholder='Search here' onChange={(e)=>{search(e.target.value)}}  /> 

    
    <Dropdown>
      <Dropdown.Toggle variant='none' id="dropdown-basic" className='drop-btn'>
      <FiFilter className='span' />  <span>{filteropt}</span> 
      </Dropdown.Toggle>

      <Dropdown.Menu className='drop-menu'>

      <Dropdown.Item onClick={()=>{fillter("all")}}>All</Dropdown.Item>
       
        <Dropdown.Item onClick={()=>{fillter("blueberry")}}>blueberry</Dropdown.Item>
       
        <Dropdown.Item onClick={()=>{fillter("carrier")}}>carrier</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
   

   

 
  </div>

  </div>


  <Table striped bordered hover className='container  '>

      <thead>
          <tr>

              {/* <th> no</th> */}
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


         { displyaData     } 
                      
          

              </tbody>

                </Table>

                <ReactPaginate 

                     previousLabel={"previous"}

                     nextLabel={"next"}

                     pageCount={pageCount}

                     onPageChange={changePage}

                     containerClassName={"paginationBttns"}
                     pageLinkClassName={"previousBttn"}
                     nextLinkClassName={"nextBttn"}
                     disabledClassName={"paginationDisabled"}
                     activeClassName={"paginationActive"}
                      />



{   //this is a aert box. press delete icon this box show on //
            
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
 
 
 
 </div>
  )
}

export default Category2
