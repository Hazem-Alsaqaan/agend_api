const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const ApiError = require("../utilities/ApiError")

dotenv.config({
    path: ".env"
})
// -----------------------------------------------------------------------------
//  @des              add or register new user at app
//  @method           post
//  @route            http://localhost:4000/api/v1/users/register
// -----------------------------------------------------------------------------
const registerUser = async(req, res, next)=>{
    const {name, email, picture} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            res.status(400).json("user's email should be an unique")
        }else{
            const newUser = await userModel.create({name, email, picture})
            const generateToken = await jwt.sign(
                {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture
                },
                process.env.TOKEN_SECRET_KEY,
                )
            res.status(200).json({user: newUser, token: generateToken})
        }
    }catch(err){
        next(new ApiError(`فشل في إنشاء الحساب ${err}`, 500))
    }
}

// -----------------------------------------------------------------------------
//  @des              login user at app
//  @method           post
//  @route            http://localhost:4000/api/v1/users/login
// -----------------------------------------------------------------------------
const loginUser = async (req, res, next)=>{
    const {email} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user){
            res.status(400).json("this user did not rejester before")
        }else{
            const generateToken = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                },
                process.env.TOKEN_SECRET_KEY,
            )
            res.status(200).json({user: user, token: generateToken})
        }
    }catch(err){
        next(new ApiError(`فشل في تسجيل الدخول ${err}`, 500))
    }
}
// -----------------------------------------------------------------------------
//  @des              delete user
//  @method           delete
//  @route            http://localhost:4000/api/v1/users/deleteUser/:id
// -----------------------------------------------------------------------------
const deleteUser = async(req, res, next)=>{
    const {id} = req.params.toString()
    try{
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).json(user)
    }catch(err){
        next(new ApiError(`فشل في حذف الحساب ${err}`, 500))
    }
}
module.exports = {
    registerUser,
    loginUser,
    deleteUser
}