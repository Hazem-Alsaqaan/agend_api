const authRouter = require("express").Router()
const { registerUser, loginUser, deleteUser } = require("../controllers/auth.controlers")
const verifyToken = require("../utilities/verifyToken")

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.delete("/deleteUser/:id", verifyToken, deleteUser)

module.exports = authRouter