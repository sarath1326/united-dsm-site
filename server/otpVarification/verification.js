

// const otpGenerator = require('otp-generator')
const { otpGen } = require('otp-gen-agent');


const otpsend_mail= require("../Email/Emailvarification")
const DB= require("../Model/dbtransfer")





  module.exports.otp=(userdata)=>{

     return new Promise(async(resolve,reject)=>{
  
           //genarate  otp    
       
        //    var otp = Math.random();
        // otp = otp * 1000000;
        // otp = parseInt(otp);

        const otp = await otpGen();
        
        const finalotp=otp

       const user_name_email={email:userdata.username,name:userdata.name};

       const data={
        sendotp:finalotp,
        user:user_name_email
       };


         
        otpsend_mail.varifi_mail(data).then((respo)=>{   //sent otp to user enter email id 
  
            if(respo.emailsend){

              const data={
              
                otp:finalotp,
                details:userdata
                 
              }

             DB.save_otp(data);      //this function use save otp and email id in DB
             
                resolve({flag:true});

                  
              }else{

                resolve({flag:false});

            }

           })

       });
 
 };



                                                   //end
