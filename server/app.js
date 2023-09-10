

const express=require("express");
const app=express();

const router=require("./Routing/router");
const db=require("./Model/dbconecting")

const cors=require("cors")
const session=require('express-session');
const cookiparser=require('cookie-parser');
const  bodyparser=require("body-parser");





app.use(express.json());

app.use( 
    cors({
        origin:("http://localhost:3000"),
        methods:["GET","POST","DELETE"],
        credentials:true
    })
);

app.use(cookiparser());


app.use(bodyparser.urlencoded({extended:true}));


app.use(
    session({

        key:"userid",
        secret:"sarath",
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires:60*60*24
        }
        

    })
);





app.use('/',router);

db.dbconecting();







app.listen(3001,()=>{

    console.log("server started");
});




                                                          //end