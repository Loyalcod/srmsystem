const Admin = require("../models/AdminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




exports.registerAdmin = async( req, res)=>{

    if(!(req.body.fullName || req.body.userName || req.body.password)) return res.status(400).json('data not formatted properly')

    const { fullName, userName, password } = req.body

    try {

        const salt = await bcrypt.genSalt(10)
        const hassPass = await bcrypt.hash(password,salt)
        const createAdmin = await Admin.create({
            fullName,
            userName,
            password: hassPass
        })
        res.status(200).json(createAdmin)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.loginAdmin = async(req,res)=>{
    if(!(req.body.userName || req.body.password )) return res.status(400).json("data not formatted properly")

    const { userName, password } = req.body

    try {
        const admin = await Admin.findOne({userName})
        if(admin){
            const validatePass = await bcrypt.compare(password, admin.password)
            if(!validatePass) return res.status(401).json('invalid password, unauthorized operation')
            const accessToken = jwt.sign({_id: admin._id, userName:admin.userName}, process.env.ACCESS_JWT_SECRET,{expiresIn: '10m'})
            const refreshToken = jwt.sign({_id: admin._id, userName: admin.userName}, process.env.REFRESH_JWT_SECRET,{expiresIn: "24h"})

            //updating the refresh token in the db first 
            const storeRefreshToken = await Admin.updateOne(
                {userName},
                {$set: {refreshToken}}
            )

            const refreshCookie = res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: "none", maxAge: 24*60*60*1000})
            console.log(refreshCookie)

            res.status(200).json({
                accessToken,
                refreshToken
            })


        }else{
            res.status(404).json("userName does not exist")
        }
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.refreshLoginAdmin = async(req,res)=>{
    const cookies = req.cookies
    if(!cookies.jwt) return res.status(401).json("cookie jwt does not exist")
    const refreshToken = cookies.jwt

    try {
        const cookieExist = await Admin.exists({refreshToken})
        if(!cookieExist) return res.status(401).json("refresh token does not exist")

        // verify cookie with jwt verify
        let admin_details = ''
        jwt.verify(refreshToken,process.env.REFRESH_JWT_SECRET,(err,payload)=>{
            if(err) return res.status(403).json("token is invalid")
            admin_details = payload
        })

        const newAccessToken = jwt.sign({admin_details},process.env.ACCESS_JWT_SECRET,{expiresIn: '10m'})

        res.status(200).json({newAccessToken})

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.logoutAdmin = async(req,res)=>{
    const cookie = req?.cookies
    if(!cookie?.jwt) return res.sendStatus(204)
    const refreshCookie = cookie?.jwt

    try {
        const deleteCookie = await Admin.updateOne(
            {refreshToken: refreshCookie},
            {$set: {refreshToken: null}}
        )
        
        res.clearCookie("jwt", {httpOnly: true, sameSite: "none"})
        res.sendStatus(204)
        
    } catch (error) {
        res.json({error:error.message})
    }
}