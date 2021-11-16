const express = require("express")
const app = express()

// panggil router member
const member= require("./router/member")
const paket = require("./router/paket")
const users = require("./router/users")
const transaksi = require("./router/transaksi")
const { login } = require ("./router/login")

app.use("/api/member", member)
app.use("/api/users", users)
app.use("/api/paket", paket)
app.use("/api/transaksi", transaksi)
app.use("/api/auth", login)

app.listen(8000,() => {
    console.log(`Server run on port 8000`);
})