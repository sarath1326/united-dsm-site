


// const {sign,verify} =require("jsonwebtoken");


// module.exports.createToken=(user)=>{

//         return new Promise ((resolve,reject)=>{


//             const accessToken= sign({username:user.username, id:user._id},"sarath1937");

//             resolve(accessToken);

//     })

// }



        //acuthentication chaking  midilware jwt


    //  module.exports.verifyauth=(req,res,next)=>{


    //     const token= req.headers["jwt-token"];

    //     if(!token){

    //         res.json({auth:false});


    //     }else{

    //         verify(token,"sarath1937" ,(err,result)=>{


    //             if(result){

                    
    //               next()
                
                
    //             }else{
                    
                    
    //                 res.json({auth:false})
                
                
    //             }

    //         })


    //     }









    //  }   



