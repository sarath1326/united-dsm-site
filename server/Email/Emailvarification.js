



const nodemailer=require("nodemailer")
const mailgen=require ('mailgen')





  


  module.exports.varifi_mail=(otp)=>{



            return new Promise((resolve,reject)=>{


                let config={

                    service:"gmail",
                    auth:{
                        user:"sarathsarath93366@gmail.com",
                        pass:"bqszytogqedtrxtz"
                    }
                };
    
    
                let transporter=nodemailer.createTransport(config);
    
    
    
                let mailGenarator=new mailgen({
    
                    theme:"default",
                    product:{
                        name:"mailgen",
                        link:"https://mailgen.js/"
                    }
    
                });
    
    
                let responces={
                    body:{
                        name:"sarath pm",
                        intro: `ypoe email varification code is ${otp}`
    
                    }
                }
    
    
                let mail=mailGenarator.generate(responces);
    
                let message={
    
                    from:"sarathsarath93366@gmail.com",
                    to:"sarathsarath93366@gmail.com",
                    subject:"email verification",
                    html:mail
                };
    
    
                transporter.sendMail(message).then(()=>{
    
                    console.log("mailsent sucssfully");
                    
                    resolve({emailsend:true})
                
                }).catch(err=>{
    
                    console.log(" mail sent filled",err)
                   
                    resolve({emailsend:false})
    
                });








            })





  }





   