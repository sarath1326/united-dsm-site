


const mongoose=require("mongoose")

const adddataschema=new mongoose.Schema({

    cuname:String,
    mobile:String,
    brand:String,
    product:String,
    defectpart:String,
    date:String


})



module.exports.dataadd=(data)=>{

    return new Promise((resolve,reject)=>{


           const dbadd=mongoose.model("data",adddataschema)

           const final=new dbadd(data)

           final.save().then((responce)=>{

            resolve(responce)
           
        }).catch(err=>{

            reject(err)

           })






    })


          

}





  