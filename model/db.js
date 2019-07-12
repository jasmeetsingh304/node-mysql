const mongoose = require('mongoose');
const mysql = require('mysql')
mongoose.connect("mongodb://localhost:27017/Innoplexus",{useNewUrlParser: true},(error)=>{
    if(!error){
        console.log("MongoDb connection succeeded")
    }
    else{
        console.log("Connection Error")
    }
})

require("./client_model")

