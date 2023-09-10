

const mongoose=require("mongoose");


module.exports.dbconecting=()=>{

    const atlas="mongodb+srv://sarathsarath93366:sarath1937@cluster0.6ryiqal.mongodb.net/?retryWrites=true&w=majority"


    mongoose.connect(atlas).then(()=>{

        console.log("mongoDB connected");

    }).catch(err=>{

        console.log("DB connecting failed");

    })
    

   

}






