const jwt = require("jsonwebtoken")


const verifyToken = async(req, res, next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)
            req.user = user 
            next()
        }catch(err){
            res.status(400).json("غير مصرح لك")
        }
    }else{
        return res.status(400).json("لا يوجد تصريح")
    }
}

module.exports = verifyToken