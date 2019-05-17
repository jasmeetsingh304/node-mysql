  const express = require('express')
  const app =  express()
  const morgan = require('morgan') 
  const mysql = require('mysql')
  const bodyParser = require('body-parser')
  const router = require('./routes/user.js')
  
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(express.static('./public'))
  app.use(morgan('short'))
  app.use(router)

  //-------------To create the Route--------------
  app.get("/", (req, res)=>
    {
    console.log("Responding to Root")
    res.send("Hello from Root.......")
    })  

  //----------To create Server--------------
  app.listen(3000,()=>
    {
    console.log("Server is up, listening on 3000")
    })
  
  