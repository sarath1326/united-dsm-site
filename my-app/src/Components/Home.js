

import React from 'react'
import "./Home.css"
import Navebar from './Navebar'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';



function Home() {
 

const navigate=useNavigate()

function cat1(){
  
  const url="cat1"
 
  navigate(`/cat/${url}`);

}

function cat2(){

  const url="cat2"

navigate(`/cat/${url}`);

}


function cat3(){

  const url="cat3"
 
  navigate(`/cat/${url}`);
}



 
 
    return (
   <div>

     <Navebar/>     

    <div className='main-home'>

      <h4 className='titles'> United Service Defective Spaer Managment</h4>

      <p> select your defect part brand and enter the details</p>

     
      
      

      <div className='container'  id='home-table-main'>

      <Table striped bordered hover className=''>
      <thead>
        <tr>
          <th>Categorys</th>
          <th>Brand</th>
        
        </tr>
      </thead>
      <tbody>
        <tr onClick={cat1}>
          <td   >Category 1</td>
          <td>LLoyd </td>
        </tr>

        <tr onClick={cat2}>
          <td >Category 2</td>
          <td>blueberry's  ,  carrier</td>
        </tr>


        <tr onClick={cat3}>
          <td>Category 3</td>
          <td>Amstrad ,onida ,other brand</td>

        </tr>
       
       
       
       
       
        </tbody>
        </Table>


        <button onClick={()=>{navigate("/form")}}    className='btn-home'> add new defect part</button>




      </div>


     
     


        
        



    </div>







    </div>
  )
}

export default Home