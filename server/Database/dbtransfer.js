


const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const { now } = require("mongoose")

const adddataschema=new mongoose.Schema({

    cuname:String,
    mobile:String,
    brand:String,
    product:String,
    defectpart:String,
    date:String,
    retunmark:Boolean,
    retundate:String


})


const authentication_schema= new mongoose.Schema({

    name:String,
    mobile:String,
    username:String,
    password:String

})









module.exports.dataadd=(data)=>{

    return new Promise((resolve,reject)=>{


           const dbadd=mongoose.model("data",adddataschema)

           const final=new dbadd(data)

           final.save().then((responce)=>{
            
            resolve({flag:true})

           
           
        }).catch(err=>{

          resolve({flag:false})

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

     module.exports.signup=(data)=>{

        return new Promise ( async(resolve,reject)=>{

            const signupdb=mongoose.model("user",authentication_schema)

            data.password = await  bcrypt.hash(data.password,10)

            const final= new signupdb(data)

            final.save().then((result)=>{
                
                resolve(result)

            })



        })

     }

     module.exports.login=(data)=>{

        const obj={}

        return new Promise (async(resolve,reject)=>{

            const logindb=mongoose.model("user",authentication_schema)


            const fetchdata= await logindb.findOne({username:data.username})

            if(fetchdata){

            const status = await bcrypt.compare(data.password,fetchdata.password)

            if(status){
                console.log("login sucss")
                obj.flag=true
                obj.data=fetchdata
                resolve(obj)
           
           
            }else{
                console.log("password not valid")
                
                resolve({flag:false})
            
            }

           
        
        }else{
            
            console.log("username not valid");
           
            resolve({flag:false})
        
        }



        })



     }


     module.exports.retunmark=(id)=>{

        var today = new Date();
        var year = today.getFullYear();
        var mes = today.getMonth()+1;
        var dia = today.getDate();
        
        var date_res =mes+"-"+dia+"-"+year;
      

        
        
        
        
        return new Promise(async (resolve,reject)=>{

            const fetchdb= mongoose.model("data",adddataschema)


       const respo= await fetchdb.updateOne({_id:id},{$set:{retunmark:true, retundate:date_res}})

                if(respo){

                    resolve({flag:true})

                }else{

                  resolve({flag:false})

                }
            })

        }




        module.exports.delete_data=(id)=>{


            return new Promise((resolve,reject)=>{


                const fetchdb= mongoose.model("data",adddataschema)

                fetchdb.deleteOne({_id:id}).then((respo)=>{

                    if(respo){

                        resolve({datadelet:true})
                    
                    }else{
                        resolve({datadelet:false})

                    }





                })


            })

                

        }