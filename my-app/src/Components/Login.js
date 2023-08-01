

import React from 'react'
import Navebar from './Navebar'
import "./Login.css"
import { BsFillPersonFill } from "react-icons/bs";

function Login() {


  return (
    <div>

        <Navebar />

        <div className='main-login'>

            <div className='formbox-login'>

              <BsFillPersonFill className='icon-login' />

                <h2> Login </h2>

                <form className='form-login'>

                    <input type='text' name='username' placeholder='username' /><br/><br/>

                    <input type='text' name='password' placeholder='password' /><br/><br/>

                    {/* <button className='btn-login'> Login</button> */}
                 
                  </form>

                  <button className='btn-login'> Login</button><br/>

                  <a className='a'> change your password ? </a>






            </div>







        </div>











    </div>
  )
}

export default Login