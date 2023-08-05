

const express=require("express");
const router=require("./Routing/router");
const db=require("./Database/dbconecting")
const cors=require("cors")
const session=require('express-session');
const coookiparser=require('cookie-parser')
const  bodyparser=require("body-parser")
const app=express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));

app.use(session({
    
    key:"userid",
    secret:"dsm",
    cookie:{expires:60*60*24},
    saveUninitialized:false,
    resave: false 


}));

app.use(bodyparser.urlencoded({extended:true}))

app.use(coookiparser());






app.use('/',router);

db.dbconecting()







app.listen(3001,()=>{

    console.log("server started")
});