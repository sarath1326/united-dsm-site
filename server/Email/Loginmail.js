


const nodemailer=require("nodemailer")
const mailgen=require ('mailgen')




                 //notification mail login time
  


  module.exports.loginmail=(data)=>{



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
                        name:`${data.name}`,
                        intro: " you are successfuly login to united service DSM"
    
                    }
                }
    
    
                let mail=mailGenarator.generate(responces);
    
                let message={
    
                    from:"sarathsarath93366@gmail.com",
                    to:`${data.mailid}`,
                    subject:"login conformation",
                    html:mail
                };
    
    
                transporter.sendMail(message).then(()=>{
    
                    console.log("mailsent sucssfully");
                
                }).catch(err=>{
    
                    console.log(" mail sent filled",err)
    
                });
            
            });
        
        };