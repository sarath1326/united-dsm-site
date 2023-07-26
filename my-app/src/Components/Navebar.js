



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


function Navebar() {

 const navigate=useNavigate()

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
            <NavDropdown.Item >  <Link to={"/cat"} className='link' >Categorys 1</Link>   </NavDropdown.Item>
              <NavDropdown.Item >
              <Link className='link' to={"/cat2"}> Categorys 2   </Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item >
              <Link className='link' to={"/cat3"}> Categorys 3 </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link  className='login' onClick={()=>{navigate("/login")}}> <span className='login-text'> Login</span>  <span  className='icon'> <FaUserAlt /> </span>    </Nav.Link>
          
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

           




        </div>













    </div>
  )
}

export default Navebar