const express = require("express")
const app = express()

//membuat dan membaca
app.use(express.json())

//panggil models
const models = require("../models/index")

//panggil model "member"
const member = models.member

//panggil fungsi auth
const {auth} = require("./login")

//fungsi auth dijadikan middleware
app.use(auth)

//endpoint for get all member
app.get("/",async (request, response)=>{
    let dataMember = await member.findAll()

    return response.json(dataMember)
})

//endpoint add new member
app.post("/",(request, response)=>{
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon

    }

    member.create(newMember)
    .then(response.json({
        message: "Data berhasil ditambahkan"
    }))
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

//endpoint update data member
app.put("/:id_member", (request,response)=>{
    //tampung data yang akan diubah
    let data = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        telepon: request.body.telepon,
        jenis_kelamin: request.body.jenis_kelamin
    }

    let parameter = {
        id_member: request.params.id_member
    }
    //proses update
    member.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: `Data berhasil diubah`,
            data: result
        })
    })
    .catch(error =>{
        return response.json({
            message: error.message
        })
    })
})
//endpoin hapus data member
app.delete("/:id_member", (request,response)=>{
    //tampung data yng akan dihapus
    let parameter = {
        id_member: request.params.id_member
    }
    //proses hapus
    member.destroy({where: parameter})
    .then(result =>{
        return response.json({
            message: `Data berhasil dihapus`
        })
    })
    .catch(error =>{
        return response.json({
            message: error.message
        })
    })
})
module.exports = app