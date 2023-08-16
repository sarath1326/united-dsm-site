

import React from 'react'
import Navebar from './Navebar'
import "./Form.css"
import { useState } from 'react'
import axios from "../constant/Axios"
import { useNavigate } from 'react-router-dom'
import { message } from "antd"


function Form() {


  const [cuname, setcuname] = useState("");
  const [mobile, setmobile] = useState("");
  const [brand, setbrand] = useState("");
  const [product, setproduct] = useState("");
  const [defectpart, setdefectpart] = useState("");
  const [date, setdate] = useState("");
  const [retunmark, setretunmark] = useState(false);
  const [retundate, setretundate] = useState("");

  const [nameV, setnameV] = useState(false)
  const [mobileV, setmobileV] = useState(false)
  const [brandV,setbrandV]=useState(false)
  const [productV,setproductV]=useState(false)
  const [defectV,setdefectV]=useState(false)
  const [dateV,setdateV]=useState(false)






  const navigate = useNavigate();

  const data = {
    cuname,
    mobile,
    brand,
    product,
    defectpart,
    date,
    retunmark,
    retundate
  }


  function addData(e) {

    e.preventDefault();

    axios.post("/post", data).then((responces) => {

      if (responces) {

        navigate("/");

        message.success("data added sucssfully...!");

      } else {


        message.error("something worng...! data adding failed");

      };

    });

   

  };


  return (
    <div>

      <Navebar />

      <div className='form-main'>

        <div className='container  form-box'>

          <h4 className='title-enter'> Enter Data</h4>

          <form onSubmit={addData} >

            <div className='line'>

              <div className='div-box'>

                <input className='input-form' type='text' placeholder='enter customer full name' name='cuname' 
                
                required
                pattern='[a-zA-Z].{2,20}'
                onBlur={()=>{setnameV(true)}}
                autocomplete="off"
                onChange={(e)=>{setcuname(e.target.value)}}

                
                />

                <br />

               { nameV && <span className='span-form'>*This filed is required & enter more 3 char</span> }


              </div>

              <div>

                <input className='input-form' type='text' placeholder='enter mobile no' name='mobile'
                
                required 
                pattern='.{10}'
                onBlur={()=>{setmobileV(true)}}
                autocomplete="off"
                onChange={(e)=>{setmobile(e.target.value)}}
                

                
                />

                <br />


              { mobileV &&  <span className='span-form' >enter valid mobile no</span> }


              </div>

            </div>

 

              {/* second row */}


              <div className='line'>

              <div className='div-box'>

                <select className='input-form' type='select' placeholder='enter brand name' name='brand' 
                
                required 
                pattern='[a-zA-Z].{2,20}'
                onBlur={()=>{setbrandV(true)}}
                autocomplete="off"
                onChange={(e)=>{setbrand(e.target.value)}}
                > <option > Select Brand</option>
                <option value={"LLoyd"} > LLoyd</option>
                <option value={"blueberry"}>blueberry</option>
                <option value={"carrier"}>carrier</option>
                <option value={"amstard"} > amstard</option>
                <option value={"onida"}>onida</option>
                <option  value={"Akiva"}> Akiva</option>

                
                
                
                </select>

                <br />

             { brandV &&   <span className='span-form'>*This filed is required</span> }


              </div>

              <div>

                <select className='input-form' type='text' placeholder='enter product name' name='product'
                required
                pattern='[a-zA-Z].{1,20}'
                onBlur={()=>{setproductV(true)}}
                autocomplete="off"
                onChange={(e)=>{setproduct(e.target.value)}}
                > 
                  <option > Select Product  </option>
                <option value={"AC"}> AC  </option>
                <option value={"Wm"}> Wm  </option>
                <option value={"TV"}> TV  </option>
                <option value={"REF"}> REF  </option>
                
                
                
                
                
                </select>


                <br />


                {productV && <span className='span-form' >This field is required</span>}


              </div>

            </div>


            {/* last row */}



            <div className='line'>

              <div className='div-box'>

                <input className='input-form' type='text' placeholder='enter defect part' name='defectpart' 
                required
                pattern='[a-zA-Z].{2,20}'
                onBlur={()=>{setdefectV(true)}}
                autocomplete="off"
                onChange={(e)=>{setdefectpart(e.target.value)}}

                />

                <br />

               { defectV && <span className='span-form'>*This filed is required</span>}


              </div>

              <div>

                <input className='input-form' type='date' placeholder='enter curent Date' name='date'

                required
                pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$'
                onBlur={()=>{setdateV(true)}}
                onChange={(e)=>{setdate(e.target.value)}}

                
                />

                <br />


                { dateV &&<span className='span-form' >This filed is required</span>}


              </div>

            </div>



        <button className='btn-enter'> Submit</button>




          </form>





        </div>


      </div>

    </div>
  )
}

export default Form