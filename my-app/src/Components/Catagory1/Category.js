



import React from 'react'
import "./Category.css"
import Table from 'react-bootstrap/Table';
import { BsTrash3Fill, BsSend } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import Navebar from '../Navebar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "../../constant/Axios"
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { message } from "antd"
import Dropdown from 'react-bootstrap/Dropdown';
import ReactPaginate from "react-paginate"
import { BiSolidErrorAlt } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'





axios.defaults.withCredentials = true;

function Category() {

  const { url } = useParams()

  const [filterbox, setfilterbox] = useState(false);
  const [fetchdata, setfetchdata] = useState([]);
  const [fillterdata, setfillterdata] = useState([]);
  const [alert, setalert] = useState(false);
  const [dataid, setdataid] = useState("");
  const [check, setcheck] = useState(false);
  const [indexvalue, setindexvalue] = useState("");
  const [title, settitle] = useState('')
  const [cat1_filter, setcat1_fillter] = useState(false)
  const [cat2_filter, setcat2_fillter] = useState(false)
  const [cat3_filter, setcat3_fillter] = useState(false)
  const [filteropt, setfilteropt] = useState("All")
  const [empty, setempty] = useState(false)
  const [loding, setloding] = useState(true)

  const navigate = useNavigate();






  useEffect(() => {

    console.log(url)



    axios(`/view/${url}`, {

      headers: {

        "jwt-token": localStorage.getItem("token")

      }


    }).then((result) => {

      const fetchrespo = result.data


      console.log("fetchdata", fetchrespo);


      if (fetchrespo.faildauth) {

        navigate("/login");


      } else if (fetchrespo.details.flag) {

        const result = fetchrespo.details

        if(result.data.length===0){

          setempty(true)
        }

        setfetchdata(result.data, { partretun: false });

        setloding(false)

       
       

        setfillterdata(result.data);
        settitle(fetchrespo.title)

        //this else if is helping change fillter option //

        if (fetchrespo.cat3fill) {

          setcat3_fillter(true);

        }

        else if (fetchrespo.cat1fill) {

          setcat1_fillter(true);

        }

        else {

          setcat2_fillter(true);

        }

        //this else if is helping change fillter option (end)   //


      } else {

        navigate("/");

      }




    }).catch(err=>{

      console.log("backend err")

    });







  }, []);




  //search option code start  //


  function search(value) {

    console.log(value);

    const res = fillterdata.filter(obj => obj.cuname.toLowerCase().includes(value) || obj.mobile.includes(value));

    if(res.length===0){
      
      setempty(true)
    
    }else{

      setfetchdata(res);
      setempty(false)

    }

    

  }

  //search option code end //

  //filter option code start//

  function fillter(value) {

    if (value == "all") {



      console.log("all");
      setfetchdata(fillterdata);

      setfilteropt("all");

    } else {

      const res = fillterdata.filter(obj => obj.brand.toLowerCase().includes(value));

      if (res) {

        setfetchdata(res);

        setfilteropt(value)

      };

    };
  };


  //filter option code end//


  //defect part return marking code starting  //


  function return_marking(id, index) {

    setalert(true);
    setdataid(id);
    setindexvalue(index);

  }

  function sendapi() {

    const id = dataid;
    const index = indexvalue;

    axios("/partsend?id=" + id).then((respo) => {

      if (respo) {

        setcheck(true);
        setalert(false);

        fetchdata[index].retunmark = true

        message.success("Part retun marking Sucssfully...!");

      } else {

        setcheck(false);
        setalert(false);
        message.success("Part retun marking Failed...!");

      }

    })

  }


  // defect part return marking code end // 


  //defect part data delet code start //


  function deletepart(id, index, retundate) {

    axios.delete("/delete", { data: { id: id, retundate: retundate } }).then((respo) => {

      if (respo.data.noretdate) {

        message.error("this part not retune");
        return

      } else if (respo.data.flag) {

        fetchdata.splice(index, 1);

        setfetchdata([...fetchdata]);

        message.success("data deleted");

      } else {

        message.error("this part delete after 30 days");

      };

    });

  };

  //defect part data delet code end //


  //pagination code start//

  const [pageNumber, setPageNumber] = useState(0);

  const userPrePage = 8;
  const pageVisited = pageNumber * userPrePage;

  const pageCount = Math.ceil(fetchdata.length / userPrePage);

  const changePage = ({ selected }) => {

    setPageNumber(selected);

  }

  const displyaData = fetchdata.slice(pageVisited, pageVisited + userPrePage)
    .map((obj, index) =>

    (
      <tr>
        {/* <td>{index+1}</td>   */}
        <td>{obj.cuname}</td>
        <td> {obj.mobile}</td>
        <td> {obj.brand}</td>
        <td>{obj.product}</td>
        <td>{obj.defectpart}</td>
        <td> {obj.date}</td>

        <td>   {obj.retunmark ? <>   <GiCheckMark className='tick-mark' />  <span>{obj.retundate}</span>  </>

          : <BsSend className='tick-mark' onClick={() => { return_marking(obj._id, index) }} />}  </td>

        <td id='icon' onClick={() => { deletepart(obj._id, index, obj.retundate) }}    > <BsTrash3Fill /> </td>

      </tr>


    ))

  //pagination code end //



  return (

    <div  >

      <Navebar />

      <div className='main'>

        <div className='   box'>

          <h1>{title} </h1>


          <div className='input-div'>

            <input type='text' placeholder='Search here' onChange={e => search(e.target.value)} />


            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='drop-btn'>
                <FiFilter className='span' />
              </Dropdown.Toggle>

              <Dropdown.Menu className='drop-menu'>


                {


                  cat3_filter ?

                    <>
                      <Dropdown.Item onClick={() => { fillter("all") }} >All</Dropdown.Item>

                      <Dropdown.Item onClick={() => { fillter("akiva") }} > Akiva </Dropdown.Item>

                      <Dropdown.Item onClick={() => { fillter("amstard") }} >Amstard</Dropdown.Item>

                      <Dropdown.Item onClick={() => { fillter("onida") }}>Onida</Dropdown.Item>

                    </>

                    : null



                }




                {

                  cat1_filter ?
                    <>

                      <Dropdown.Item onClick={() => { fillter("all") }} >All</Dropdown.Item>

                      <Dropdown.Item onClick={() => { fillter("lloyd") }} >LLoyd</Dropdown.Item>

                    </>
                    : null

                }


                {

                  cat2_filter ?
                    <>

                      <Dropdown.Item onClick={() => { fillter("all") }} >All</Dropdown.Item>

                      <Dropdown.Item onClick={() => { fillter("blueberry") }} >blueberry</Dropdown.Item>

                      <Dropdown.Item onClick={() => { fillter("carrier") }} >carrier</Dropdown.Item>


                    </>
                    : null

                }




              </Dropdown.Menu>
            </Dropdown>


          </div>

        </div>


        {

          loding ?   //loding spinner addd

            <div className='empty-div'>

              <Oval
                height={80}
                width={50}
                color="#0E21A0"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}

              />



            </div>


            :

            empty ?     //fetchdata empty time show this image

              <div className='empty-div'>

                <img className='empty-img' src='../noresult.jpeg ' alt='loding...' />



              </div>



              :

              <>


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



                    {displyaData}



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

              </>

        }




        {   //this is a aert box. press delete icon this box show on //

          alert &&

          <div className='alert-box'>

            <div className='icon-alert-main'>

              <BiSolidErrorAlt className='waring-icon' />

            </div>

            <h4> Are you sure this defect part sent to Return</h4>

            <div className='btngroup'>

              <button className='btn-back' onClick={() => { setalert(false) }}   >Get Back</button>

              <button className='btn-conf' onClick={sendapi}   >conform</button>

            </div>

          </div>



        }



      </div>


    </div>

  )
}

export default Category