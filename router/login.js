const express = require ("express")
const app = express()
const md5 = require("md5")
app.use(express.json())
const jwt = require("jsonwebtoken")
const secretkey = "underpresser"


const models = require("../models/index")
const user = models.users;

app.post("/",async (request,response) => {
    let newLogin = {
        username: request.body.username,
        password: md5(request.body.password), 
    }
    let dataUser = await user.findOne({
        where : newLogin
    });
    
    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretkey)
        return response.json({
            logged: true,
            token: token
        })
    } else {
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
})

// fungsi auth digunakan untuk verivikasi token yang dikirimkan 
const auth = (request, response, next) => {
    //kita dapatkan data authorization
    let header = request.headers.authorization
    //header = Bearer hofihdsofhfifhsdkhsak

    //kits ambil data tokennya
    let token = header && header.split( " " ) [1]

    if(token == null) {
        //jika tokennya kosong
        return response.status(401).json({
            message: `Unauthorized`
        })
    }else{
        let jwtHeader ={
            algorithm: "HS256"
        }
    }
}

module.exports = app