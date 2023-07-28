

const mongoose=require("mongoose")


module.exports.dbconecting=()=>{
    

    mongoose.connect('mongodb://127.0.0.1:27017/testunited-dsm')
.then(() => console.log("DB connected"));

}






