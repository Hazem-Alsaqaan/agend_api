const { registerUser, loginUser, deleteUser } = require("../controllers/auth.controlers")
const authRouter = require("express").Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/deleteUser/:id",deleteUser)

module.exports = authRouter