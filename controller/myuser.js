const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('../model/db')
require("../model/user_model")
const mongoose = require('mongoose')
const User = mongoose.model('users');




//---------Connection to connect mysql--------
const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'kudipaji',
    database:'innoplexus'
  })

  function getConnection()
  {
    return pool
  }


  //-------------To create the Route--------------
  router.get("/", (req, res)=>
    {
    console.log("Responding to Root")
    res.send("Hello from Root.......")
    })  

    
  
  //-------------To get user details from tables-------
  router.get("/users",(req, res)=>{
  var modata
  var myrows
    User.find((error, data)=>{
        if(!!error){
            console.log("Query error");
          }
          else{
              console.log("Query successfully submit");
        }
        modata = JSON.parse(JSON.stringify(data))
      })

      const queryString = "SELECT * FROM users"
      getConnection().query(queryString,(error, rows, fields)=>{
          if(!!error){
              console.log("Query error");
           }
           else{
               console.log("Query successfully submit");
            }
          myrows = JSON.parse(JSON.stringify(rows))
          myrows.forEach((doc,i)=>{
            doc["ids"] = modata[i].id
            doc["address"] = modata[i].address
              
          })
          res.send(myrows)
      })
})


  //-------------To get user details by id--------------
  router.get("/users/:id", (req, res) =>{
  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = "+userId
     getConnection().query(queryString,(error, rows, fields)=>{
         if(!!error){
             console.log("Query Error")
         }
         else{
             console.log("Successfully Submit query")
             res.send(rows)
         }
     })
 })  
 
 
//---------------To save user detail in table----------
router.post("/create_users", (req, res)=>{
const id = req.body.id
const firstName =req.body.first_name
const lastName = req.body.last_name
const age = req.body.age
const queryString = "INSERT INTO users VALUES(?,?,?,?)"
getConnection().query(queryString,[id,firstName,lastName,age], (error, results, fields)=>{
    if(error){
        console.log("Query Error")
        res.status(500).send("some error of 500 occured");
        res.end()
    }
    else{
        console.log("Query submit successfully")
        console.log("User added successfully")
        res.status(200).send("User added successfully")
        }
    })


const user = new User()
user.id = req.body.id
user.address = req.body.address
user.save((error, result)=>{
    if(!!error){
        console.log("Error");
    }
    else{
        console.log("Successful");
        }
    })
}) 


//---------------To delete user from table-----------------
router.delete("/delete_user", (req, res)=>{
  const userId = req.body.id
  const queryString = "DELETE FROM users WHERE id="+userId
  getConnection().query(queryString,(error, results, fields)=>{
      if(error){
          console.log("Query Error")
      }
      else{
         console.log("User delete successfully")
         res.send("User deleted successfully")
      }
  })
  const user = new User()
  console.log(userId,"out");
  
  user.findByIdAndRemove(userId,(error,result)=>{
      console.log(userId,"In");
      
      console.log("deleted");
      
  })
})

//---------------To update user----------------
router.put("/update_user",(req, res)=>{
 const oldName = req.body.old_name
 const newName = req.body.new_name
 const queryString = "update users set firstName = ? where firstName = ?"
 getConnection().query(queryString,[newName,oldName],(error, results, fields)=>{
     if(error){
         console.log("Query Error")
     }
     else{
         console.log("User update successfully")
         res.send("User updated successfully")
      }
 })
})

module.exports = router