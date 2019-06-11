const express = require('express')
const mysql = require('mysql')
const router = express.Router()

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

//-------------To get user details from tables-------
router.get("/users", (req, res)=>{
  const queryString = "SELECT * FROM users"  
  getConnection().query(queryString,(error, rows, fields)=>
    {
    if(error){console.log("Query Error")}
    else{console.log("Query submit successfully")}
    res.send(rows)
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
 router.post("/create_user", (req, res)=>{
     const firstName = req.body.first_name
     const lastName = req.body.last_name
     const queryString = "INSERT INTO users(firstName,lastName) VALUES(?,?)"
     getConnection().query(queryString,[firstName,lastName], (error, results, fields)=>{
         if(error){
             console.log("Query Error")
             res.sendStatus(500)
             res.end()
         }
         else{
             console.log("Query submit successfully")
             console.log("User added successfully")
             res.send("User added successfully")
             }
         })
 })

 //---------------To delete user from table-----------------
 router.post("/delete_user", (req, res)=>{
     const userId = req.body.user_id
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
 })

 //---------------To update user----------------
 router.post("/update_user",(req, res)=>{
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