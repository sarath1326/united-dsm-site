

const express=require("express")

const router=express.Router()
const db=require("../Database/dbtransfer")



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


router.get("/view/cat1",(req,res)=>{

    db.viewcat1().then((respo)=>{

        if(respo.flag){
            res.json(respo.data)

        }else{

            res.sendStatus(404)

        }

    })





})


router.get("/view/cat2",(req,res)=>{

    db.viewcat2().then((respo)=>{

         if(respo.flag){
           
            res.json(respo.data)
        
        }else{
            res.sendStatus(404)
        }


    })

     



})








module.exports=router;