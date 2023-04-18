const jwt = require("jsonwebtoken")


const verifyAuthentication = async (req,res,next)=>{
    const cookieExist = req?.cookies?.jwt
    if(!cookieExist) return res.status(401).json({message: "cookie not present"})
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(403).json({message: "auth header is empty"})
    authToken = authHeader.split(" ")[1]
    jwt.verify(authToken,process.env.ACCESS_JWT_SECRET,(err,payload)=>{
        if(err) return res.status(403).json({message: "auth token is invalid"})
    })
    next()
}

module.exports = verifyAuthentication