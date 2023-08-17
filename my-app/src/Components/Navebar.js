



import React from 'react'
import "./Navebar.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import {FaUserAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import axios from "../constant/Axios";
import { useState,useEffect } from 'react';


function Navebar() {

  const navigate=useNavigate();
  const [uasername,setusername]=useState('');


      
      useEffect(()=>{


        axios("/username/navbar",{
          headers:{
            
            "jwt-token" :localStorage.getItem("token")

          }

        }).then((respo)=>{

            const fetchdata=respo.data

             if(fetchdata.flag){

              setusername(fetchdata.userdata.name)

             }else{

              setusername("");
             }



        });

   },[]);


          function logout(){

            localStorage.removeItem("token");
            navigate("/")


          } 
          
          function cat1(){
  
            const url="cat1";
           
            navigate(`/cat/${url}`);
          
          };

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

        <div className='navbar-main'>


        <Navbar expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#" className='title'>DSM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link > <Link to={"/"} className='link'> Home</Link>   </Nav.Link>
            {/* <Nav.Link href="#action2">Link</Nav.Link> */}
            <NavDropdown title="Categorys" id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={cat1} >  category 1   </NavDropdown.Item>
              <NavDropdown.Item onClick={cat2} >
             category 2
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={cat3} >
             Category 3
              </NavDropdown.Item>
            </NavDropdown>

           <span className='login-text'> {uasername ? uasername : null}        </span>  
            
            <span  className='icon'> 
            
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        
        <FaUserAlt />
       
      </Dropdown.Toggle>

      <Dropdown.Menu>

        { uasername ?  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>

        :
             
        <Dropdown.Item onClick={()=>{navigate('/login')}}>Login</Dropdown.Item>

  }
       
       
      
      
      </Dropdown.Menu>
    </Dropdown>
            
            
            
            
            
            
            
             </span>   
            
            
            
            
            
            
            
            
            
            
            
            
           
          
          
          
          
          
          
          
          
          
          
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

           




        </div>













    </div>
  )
}

export default Navebar