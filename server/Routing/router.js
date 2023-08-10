

const express=require("express")

const router=express.Router()
const db=require("../Database/dbtransfer")
const loginmail=require("../Email/Loginmail")

const jwt =require("jsonwebtoken")




  //jwt acthverify midilware (starting)

 const verifyauth=(req,res,next)=>{

      const token= req.headers["jwt-token"];

    if(!token){

        console.log("no token")
        
        res.json({faildauth:true});

          }else{

        jwt.verify(token,"sarath1937" ,(err,result)=>{

             if(result){
                
                next()
            
            
            }else{
                
                console.log("not valid token")
                
                res.json({faildauth:true})
            
            
            }

        })


    }


}



 //jwt acthverify midilware (end)





 



router.post("/post",(req,res)=>{

    const data=req.body

    if(data){

        db.dataadd(data).then((respo)=>{

            if(respo){

              res.json({flag:true})

            }else{
                res.json({flag:false})
            }

        }).catch(err=>{


            res.json({flag:false})

        })




    }

    


})


router.get("/view/cat1",verifyauth,(req,res)=>{

    console.log("hello")

    db.viewcat1().then((respo)=>{

        res.json({details:respo,faildauth:false})

        

    })





})


router.get("/view/cat2",verifyauth,(req,res)=>{

    db.viewcat2().then((respo)=>{

        res.json({details:respo,faildauth:false})

    })

     



})


router.get("/view/cat3",verifyauth,(req,res)=>{

    db.viewcat3().then((respo)=>{

        res.json({details:respo,faildauth:false})


        
   
    })

})



router.post("/signup",(req,res)=>{

   db.signup(req.body).then((result)=>{

   
    res.json(result)

  
})



})


router.post("/login",(req,res)=>{

    db.login(req.body).then((result)=>{

        if(result.flag){

            const user=result.data

            const {name,_id}=user
            
           // jwt token creation

           const token= jwt.sign({name:name,id:_id},"sarath1937" ,{
            
            expiresIn:300
           
        })

           
           //mail sent
             loginmail.loginmail();

             res.json({check:true,jwttoken:token});

        }else{

        
            res.json({check:false});

        };

          

    
        });



});


router.get("/username/navbar",(req,res)=>{

    const token= req.headers["jwt-token"];

    if(!token){

        res.json({flag:false})
    
    }else{

        jwt.verify(token ,"sarath1937",(err,result)=>{

            if(result){

              res.json({flag:true,userdata:result})



            }else{

                res.json({flag:false})
            }

        })

    }


})



    router.get("/partsend",(req,res)=>{

        console.log(req.query.id)

        db.retunmark(req.query.id).then((respo)=>{ 

            if(respo){

              res.json({flag:true})


            }else{

                res.json({flag:false})

                     
            
            }

        })





    })




   















module.exports=router;