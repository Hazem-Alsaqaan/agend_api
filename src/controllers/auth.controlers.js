const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

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
        console.log(`can't register the user ${err}`)
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
        console.log(err)
    }
}
module.exports = {
    registerUser,
    loginUser
}