

import React from 'react'
import Navebar from './Navebar'
import "./Login.css"

function Login() {


  return (
    <div>

        <Navebar />

        <div className='main-login'>

            <div className='formbox-login'>

                <h2> Login </h2>

                <form className='form-login'>

                    <input type='text' name='username' placeholder='username' /><br/><br/>

                    <input type='text' name='password' placeholder='password' /><br/><br/>

                    <button className='btn-login'> Login</button>






                </form>






            </div>







        </div>











    </div>
  )
}

export default Login