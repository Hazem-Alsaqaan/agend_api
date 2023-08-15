const { registerUser, loginUser } = require("../controllers/auth.controlers")
const authRouter = require("express").Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)


module.exports = authRouter