

import React from 'react'
import "./Signup.css"

function Signup() {
  return (
    <div className='main-sig'>

        <div>

        <form>

         <input type='text' placeholder='name' name='name'   /><br/><br/>

         <input type='text' placeholder='mobile no' name='name'   /><br/><br/>

         <input type='text' placeholder='username or email id' name='name'   /><br/><br/>

         <input type='text' placeholder='password' name='name'   /><br/><br/>

         </form> <br/>

         <button className='btn-sig'> signup </button>

         </div>






    </div>
  )
}

export default Signup