const express = require('express')
const router = express.Router()
const mysql = require('mysql')
require('../model/db')
require("../model/user_model")
require("../model/client_model")
const mongoose = require('mongoose')
const Client = mongoose.model('client');
const bcrypt = require('bcrypt');




  //-------------To create the Route--------------
  router.get("/", (req, res)=>
    {
    console.log("Responding to Root")
    res.send("Hello from Root.......")
    })  

    
  
//   //-------------To get user details from tables-------
//   router.get("/users",(req, res)=>{
//   var modata
//   var myrows
//     User.find((error, data)=>{
//         if(!!error){
//             console.log("Query error");
//           }
//           else{
//               console.log("Query successfully submit");
//         }
//         modata = JSON.parse(JSON.stringify(data))
//       })

//       const queryString = "SELECT * FROM users"
//       getConnection().query(queryString,(error, rows, fields)=>{
//           if(!!error){
//               console.log("Query error");
//            }
//            else{
//                console.log("Query successfully submit");
//             }
//           myrows = JSON.parse(JSON.stringify(rows))
//           myrows.forEach((doc,i)=>{
//             doc["ids"] = modata[i].id
//             doc["address"] = modata[i].address
              
//           })
//           res.send(myrows)
//       })
// })


//   //-------------To get user details by id--------------
//   router.get("/users/:id", (req, res) =>{
//   const userId = req.params.id
//   const queryString = "SELECT * FROM users WHERE id = "+userId
//      getConnection().query(queryString,(error, rows, fields)=>{
//          if(!!error){
//              console.log("Query Error")
//          }
//          else{
//              console.log("Successfully Submit query")
//              res.send(rows)
//          }
//      })
//  })  
 
 
//---------------To save user detail in table----------
router.post("/signup", (req, res)=>{
const userName =req.body.user_name
const emailId = req.body.email_id
const password = req.body.password
const token = "qwertyuiopasdfghjkl"
let hash = bcrypt.hashSync(password, 10);

const client = new Client()
client.userName = req.body.user_name
client.emailId = req.body.email_id
client.password = hash
client.token = token
client.save((error, result)=>{
    if(!!error){
        console.log("Error");
    }
    else{
        console.log("Successful");
        }
    })
    res.send("Record submit successfully")

})


//---------------To Verify the user credentials---------
router.get("/login",(req, res)=>{
const userName =req.body.user_name
const password = req.body.password

Client.find((error, data)=>{
    if(!!error){
        console.log("Query error");
      }
      else{
          console.log("Query successfully submit");
    }
    modata = JSON.parse(JSON.stringify(data))
    if(modata.userName == user_name){

    }
  })


})


// //---------------To delete user from table-----------------
// router.delete("/delete_user", (req, res)=>{
//   const userId = req.body.id
//   const queryString = "DELETE FROM users WHERE id="+userId
//   getConnection().query(queryString,(error, results, fields)=>{
//       if(error){
//           console.log("Query Error")
//       }
//       else{
//          console.log("User delete successfully")
//          res.send("User deleted successfully")
//       }
//   })
//   const user = new User()
//   console.log(userId,"out");
  
//   user.findByIdAndRemove(userId,(error,result)=>{
//       console.log(userId,"In");
      
//       console.log("deleted");
      
//   })
// })

// //---------------To update user----------------
// router.put("/update_user",(req, res)=>{
//  const oldName = req.body.old_name
//  const newName = req.body.new_name
//  const queryString = "update users set firstName = ? where firstName = ?"
//  getConnection().query(queryString,[newName,oldName],(error, results, fields)=>{
//      if(error){
//          console.log("Query Error")
//      }
//      else{
//          console.log("User update successfully")
//          res.send("User updated successfully")
//       }
//  })
// })

module.exports = router