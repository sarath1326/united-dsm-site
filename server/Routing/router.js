

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








module.exports=router;