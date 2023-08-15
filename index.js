const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./db")
const authRouter = require("./src/routes/auth.route")
dotenv.config({
    path:".env"
})
const {PORT} = process.env 
const app = express()
app.use(express.json())
app.use(express.urlencoded({limit: "50mb", extended: true}))
app.use(express.json({limit: "50mb"}))
app.use(cors({
    credentials: true
}))



app.use("/api/v1/users", authRouter)

app.listen(PORT, ()=>console.log("server is running...."))