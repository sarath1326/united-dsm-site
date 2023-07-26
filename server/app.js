

const express=require("express");
const router=require("./Routing/router");
const db=require("./Database/dbconecting")

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));






app.use('/',router);

db.dbconecting()







app.listen(3000,()=>{

    console.log("server started")
});