const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({
    path:".env"
})
const {URL} = process.env

mongoose.connect(URL)
.then(()=>console.log("Connecting Succeded...."))
.catch((err)=> console.log(`Connecting Rejected.... ${err}`))