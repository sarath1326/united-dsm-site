

const mongoose=require("mongoose")


module.exports.dbconecting=()=>{
    

    mongoose.connect('mongodb://127.0.0.1:27017/united-dsm')
.then(() => console.log("DB connected"));

}






