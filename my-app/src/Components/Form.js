

import React from 'react'
import Navebar from './Navebar'
import "./Form.css"

function Form() {
  return (
    <div>

        <Navebar />

        <div className='form-main'> 

        <div className='form' >

            <h4> Enter Data</h4>

            <div className='input-form' >

              <form>

            <input type='text' name='cuname' placeholder='coustmoer name' required="true" /><br /><br/>

            <input type='text' name='mobile' placeholder='mobile no' required="true" /><br/><br/>

            <input type='text' name='barnd' placeholder='barnd' required="true"  /><br/><br/>
            

            <input type='text' name='product' placeholder='product' required="true" /><br/><br/>

            <input type='text' name='defectpart' placeholder='Defect part' required="true" /><br/><br/>

            <input type='date' name='date' placeholder='enter date' required="true" /><br/><br/>

                <button className='btn-form'> submit</button>
               
               </form>
             
              </div>


        </div>









        </div>








    </div>
  )
}

export default Form