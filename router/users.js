const express = require ("express")
const app = express()
const md5 = require("md5")
app.use(express.json())

const models = require("../models/index")
const users = models.users


//endpoint get data users 
app.get("/",async(request, response)=>{
    let dataUsers = await users.findAll()
    return response.json(dataUsers)
})
//endpoint insert new users
app.post("/", (request,response)=> {
    let newUsers = {
        nama: request.body.nama,
        username: request.body.username,
        password: md5(request.body.password),
        role:request.body.role
    }
    users.create(newUsers)
    .then(result=>{
        return response.json({
            message: "Data berhasil ditambahkan",
            data: result
        })
        .catch(error =>{
            return response.json({
                message: error.message
            })
    })
    })
})
module.exports = app