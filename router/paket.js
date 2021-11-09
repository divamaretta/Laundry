const express = require("express")
const app = express()

//membuat dan membaca
app.use(express.json())

//panggil models
const models = require("../models/index")
const { response, request } = require("express")

//panggil model "paket"
const paket = models.paket

//endpoint for get all paket
app.get("/",async (request, response)=>{
    let dataPaket = await paket.findAll()

    return response.json(dataPaket)
})

//endpoint add new paket
app.post("/",(request, response)=>{
    let newPaket = {
        jenis_paket : request.body.jenis_paket,
        harga : request.body.harga

    }

    paket.create(newPaket)
    .then(response.json({
        message: "Data berhasil ditambahkan"
    }))
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})
//endpoint update data paket
app.put("/:id_paket", (request,response)=>{
    //tampung data yang akan diubah
    let data = {
        jenis_paket : request.body.jenis_paket,
        harga : request.body.harga
    }

    let parameter = {
        id_paket: request.params.id_paket
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
app.delete("/:id_paket", (request,response)=>{
    //tampung data yng akan dihapus
    let parameter = {
        id_paket: request.params.id_paket
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