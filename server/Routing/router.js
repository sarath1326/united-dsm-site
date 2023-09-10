

const express=require("express");

const router=express.Router();
const db=require("../Model/dbtransfer");
const loginmail=require("../Email/Loginmail");
const method=require("../Methods/deleteMethod");
const emailvarification = require("../otpVarification/verification");

const jwt =require("jsonwebtoken");




  //jwt acthverify midilware (starting)

 const verifyauth=(req,res,next)=>{

      const token= req.headers["jwt-token"];

    if(!token){

        console.log("no token");
        
        res.json({faildauth:true});

          }else{

        jwt.verify(token,"sarath1937" ,(err,result)=>{

             if(result){
                
                next();
            
            
            }else{
                
                console.log("not valid token");
                
                res.json({faildauth:true});
            
            
            };

        });


    };


};



 //jwt acthverify midilware (end)





 



router.post("/post",(req,res)=>{     //new data ading req //

    const data=req.body;

    if(data){

        db.dataadd(data).then((respo)=>{

            if(respo){

              res.json({flag:true});

            }else{
                res.json({flag:false});
            };

        }).catch(err=>{


            res.json({flag:false});

        });

      };

    });


router.get("/view/cat1",verifyauth,(req,res)=>{

      db.viewcat1().then((respo)=>{

        res.json({details:respo,faildauth:false,title:"LLoyd",cat1fill:true});

        

    });

});


router.get("/view/cat2",verifyauth,(req,res)=>{

    db.viewcat2().then((respo)=>{

        res.json({details:respo,faildauth:false,title:"blueberry,carrier",cat2fill:true});

    });

     
});


router.get("/view/cat3",verifyauth,(req,res)=>{

   

    db.viewcat3().then((respo)=>{

        res.json({details:respo,faildauth:false,title:"Akiva,Amstard,Onida",cat3fill:true});


        
   
    });

});



router.post("/signup",(req,res)=>{



    const email= req.body.username;

      db.emailexist(email).then((respo)=>{   //this function chack user enter email allready exist 

            
            if(respo.exist){

                res.json({signup:false});
               
                console.log("exist");
                
                return

            }else{

                console.log("hiiii")

                emailvarification.otp(req.body).then((respo)=>{  // this function use, user enter new email then sent otp for email varification 

                    if(respo.flag){

                        res.json({signup:true})    //sent this responces client side show otp enter page 
                   
                    }else{

                        res.json({signup:false});    

                    };

                })

             }

         }) ; 

});










      router.post("/otpverifi",(req,res)=>{    

        const data=req.body;

         db.match_otp(data.otp).then((respo)=>{    //otp ferification 

            if(respo.flag){

                res.json({varifi:true})

            }else{

                res.json({varifi:false});
            }

         }).catch(err=>{
            
            res.sendStatus(500);
         
        }); 

    });  
 










router.post("/login",(req,res)=>{             //login req 

    db.login(req.body).then((result)=>{

        if(result.flag){

            const user=result.data;

            const {name,_id,username}=user;
            
           // jwt token creation

           const token= jwt.sign({name:name,id:_id},"sarath1937" ,{
            
            expiresIn:36000 
           
        });

             const mailData={
                name:name,
                mailid:username
             }
           
             loginmail.loginmail(mailData);        //mail sent login notification   

             res.json({check:true,jwttoken:token});

        }else{

        
            res.json({check:false});

        };

          });

});


router.get("/username/navbar",(req,res)=>{          //get login user name and sent to navbar

    const token= req.headers["jwt-token"];

    if(!token){

        res.json({flag:false});
    
    }else{

        jwt.verify(token ,"sarath1937",(err,result)=>{

            if(result){

              res.json({flag:true,userdata:result});



            }else{

                res.json({flag:false});
            }

        });

    }


});



    router.get("/partsend",(req,res)=>{            //defect part sent marking req

        console.log(req.query.id);

        db.retunmark(req.query.id).then((respo)=>{ 

            if(respo){

              res.json({flag:true});


            }else{

                res.json({flag:false});

                     
            
            }

        });





    });



    router.delete("/delete",(req,res)=>{        //defect part delete req

        const {id,retundate}=req.body;

       

              
      method.data_delete(retundate).then((respo)=>{

        if(respo.redate){

            res.json({noretdate:true})

        }else if(respo.flag){

            db.delete_data(id).then((result)=>{

                if(result){

                    res.json({flag:true});
        
                }else{

                    res.sendStatus(500);
                }

              })

           
        }else{

            res.json({flag:false});
        }

});


  });


module.exports=router;



                                              //end