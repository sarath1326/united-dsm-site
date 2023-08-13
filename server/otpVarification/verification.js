

const otpGenerator = require('otp-generator')

const otpsend_mail= require("../Email/Emailvarification")
const DB= require("../Database/dbtransfer")





  module.exports.otp=(userdata)=>{

     return new Promise((resolve,reject)=>{
  
           //genarate  otp    
       
           var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);

        const sendotp=otp

         otpsend_mail.varifi_mail(sendotp).then((respo)=>{   //sent otp to user enter email id 
  
            if(respo.emailsend){

              const data={
              
                otp:sendotp,
                details:userdata
                 
              }

               DB.save_otp(data)      //this function use save otp and email id in DB
             
                resolve({flag:true})

                  
              }else{

                resolve({flag:false})

            }

           })

       



        
        
        
        
        
        
        })
 


  }

