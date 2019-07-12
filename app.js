  const express = require('express')
  const app =  express()
  const morgan = require('morgan') 
  const bodyParser = require('body-parser')
  //const router = require("./controller/myuser")
  const router = require("./controller/client")
 
  
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(express.static('./public'))
  app.use(morgan('short'))
  app.use(bodyParser.json())
  app.use(router)
  
//----------To create Server--------------  
app.listen(3000,()=>
{
console.log("Server is up, listening on 3000")
})