


const nodemailer=require("nodemailer")
const mailgen=require ('mailgen')





  


  module.exports.loginmail=()=>{



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
                        intro: " you are succsusfully login to united service DSM"
    
                    }
                }
    
    
                let mail=mailGenarator.generate(responces);
    
                let message={
    
                    from:"sarathsarath93366@gmail.com",
                    to:"sarathsarath93366@gmail.com",
                    subject:"login conformation",
                    html:mail
                };
    
    
                transporter.sendMail(message).then(()=>{
    
                    console.log("mailsent sucssfully");
                
                }).catch(err=>{
    
                    console.log(" mail sent filled",err)
    
                });








            })





  }