

const express=require("express")

const router=express.Router()
const db=require("../Database/dbtransfer")
// const uuidv4=require("uuid")




 function logincheck(req,res,next){

       if(req.session.loginok){

        next();

       }else{
          
          res.json({notlogin:true})  
      
    }

 };




router.post("/post",(req,res)=>{

    const data=req.body
    
    if(data){

        db.dataadd(data).then((respo)=>{

            res.json("data added")
        
        
        }).catch(err=>{

            res.json("failed"+err)

        })

         }else{

           res.json("data not reseving server")

         }
    

})


router.get("/view/cat1",logincheck,(req,res)=>{

    

    db.viewcat1().then((respo)=>{

        if(respo.flag){
            res.json(respo.data)

        }else{

            res.sendStatus(404)

        }

    })





})


router.get("/view/cat2",logincheck,(req,res)=>{

    db.viewcat2().then((respo)=>{

         if(respo.flag){
           
            res.json(respo.data)
        
        }else{
            res.sendStatus(404)
        }


    })

     



})


router.get("/view/cat3",logincheck,(req,res)=>{

    db.viewcat3().then((repso)=>{

        if(repso.flag){
            
            res.json(repso.data)
       
        }else{
            res.sendStatus(404)
        
        }
   
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
            
            req.session.user=user
            req.session.loginok=true

            res.json({check:true})

        }else{

        
            res.json({check:false})

        }

          

    
        })



})


router.get("/navebar/getusername",(req,res)=>{

    const userdetails=req.session.user;

    if(req.session.loginok){
        
        
        res.json({flag:true , data:userdetails.name});
    
    
    }else{

        res.json({flag:false})

    }

});






module.exports=router;