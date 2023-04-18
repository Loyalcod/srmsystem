const allowedOrigin = require("../config/allowedOrigin")

const credentials = (req,res,next) =>{
    const origin = req.headers.origin
    if(allowedOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credential',true)
    }
    next()
}

module.exports = credentials