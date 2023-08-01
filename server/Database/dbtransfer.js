


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


module.exports.viewcat1=()=>{

       const obj={}


      return new Promise ( async(resolve,reject)=>{

            
        const fetchdb= mongoose.model("data",adddataschema)


              const result=  await fetchdb.find({brand:"LLoyd"})

                 if(result){

                    obj.flag=true
                    obj.data=result

                    resolve(obj)
                 
                }else{
                    resolve({flag:false})
                }
             

             })



            }


  

     module.exports.viewcat2=()=>{

        const obj={}

        return new Promise(async(resolve,reject)=>{

            const fetchdb= mongoose.model("data",adddataschema)


                const result= await fetchdb.find({brand:{$in:["blueberry","carrier"]}})

                 if(result){
                    obj.flag=true
                    obj.data=result

                    resolve(obj)
                
                
                }else{

                    resolve({flag:false})

                 }



        })

     }       
     
     
     module.exports.viewcat3=()=>{

        const obj={}

        return new Promise( async(resolve,reject)=>{


            const fetchdb= mongoose.model("data",adddataschema)

            const result= await fetchdb.find({brand:{$in:["amstard","onida","other"]}})

                console.log(result)
            
            
            if(result){

                    obj.flag=true
                    obj.data=result

                    resolve(obj)

                }else{
                    resolve({flag:false})
                }  
             


        })

     }


  