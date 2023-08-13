


const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const { now } = require("mongoose")

const add_dataschema=new mongoose.Schema({

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
    
    username:{type:String,unique:true},   //email
   
    password:String

})



const otp_Schema=new mongoose.Schema({

    otp:String,

    name:String,
    
    mobile:String,
    
   username:String,   //email
   
    password:String

})









module.exports.dataadd=(data)=>{

    return new Promise((resolve,reject)=>{


           const dbadd=mongoose.model("data",add_dataschema)

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

            
        const fetchdb= mongoose.model("data",add_dataschema)


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

            const fetchdb= mongoose.model("data",add_dataschema)


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


            const fetchdb= mongoose.model("data",add_dataschema)

            const result= await fetchdb.find({brand:{$in:["amstard","onida","Akiva"]}})

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



     module.exports.emailexist=(data)=>{

        

        return new Promise(async(resolve,reject)=>{

       const signupdb=mongoose.model("user",authentication_schema)   

          const usernameChack= await  signupdb.findOne({username:data})

          if(usernameChack){

             resolve({exist:true})


          }else{
           
               resolve({exist:false})
          
           
         }



        })

     }



    module.exports.save_otp=(data)=>{

      const finaldata={

        otp: data.otp,
        name:data.details.name,
        mobile:data.details.mobile,
        username:data.details.username,
        password:data.details. password

        }


        return new Promise((resolve,reject)=>{

            const otpDb=mongoose.model("OTP",otp_Schema)

            
              const final = new otpDb(finaldata)

              final.save().then((respo)=>{

                resolve(respo)

                }).catch(err=>{

                    console.log(err)
                })

          })


         }





         module.exports.match_otp=(otp)=>{                          //user enter otp number matching function 

        return new Promise(async(resolve,reject)=>{

                const otpDb=mongoose.model("OTP",otp_Schema)   //otp and user details saving model (temparary)
               
                const signupdb=mongoose.model("user",authentication_schema)  // user details saving model (permanent )

                const fetchdata = await otpDb.findOne({otp:otp})

                if(fetchdata){

                    resolve({flag:true})
                      
                    otpDb.deleteOne({otp:otp}).then(()=>{})    //delet data in "OTP " collection 
                     
                   console.log(fetchdata)

                   const signupdata={                    //user data save in "user" collection start//

                    name:fetchdata.name,
                    mobile:fetchdata.mobile,
                    username:fetchdata.username,
                    password:fetchdata.password
                 }


                 signupdata.password = await bcrypt.hash(signupdata.password,10)

                 const final= new signupdb(signupdata)

                 final.save().then(()=>{

                    console.log("data saveed")

                 }).catch(err=>{

                    reject(err)
                 })                                 //user data save in "user" collection end//
                                   
                   
                  }else{

                    resolve({flag:false})

                }



               })




         }
           





















     module.exports.signup=(data)=>{

        return new Promise ( async(resolve,reject)=>{

            const signupdb=mongoose.model("user",authentication_schema)

            const username=data.username
           
            data.password = await  bcrypt.hash(data.password,10)

            const final= new signupdb(data)

            final.save().then((result)=>{
                
                resolve({flag:true})

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

            const fetchdb= mongoose.model("data",add_dataschema)


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


                const fetchdb= mongoose.model("data",add_dataschema)

                fetchdb.deleteOne({_id:id}).then((respo)=>{

                    if(respo){

                        resolve({datadelet:true})
                    
                    }else{
                        resolve({datadelet:false})

                    }





                })


            })

                

        }