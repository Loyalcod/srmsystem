const express = require("express")
const app = express()
const cors = require("cors")
const corsOption = require("./config/corsOptions")
const credentials = require("./middleWare/credentials")
require("dotenv").config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")

connectDB()

const Port = 8000
app.use(credentials)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(corsOption))


app.get('/',(req,res)=>{
    res.send("home page")
})

//creating router admin
const routerAdmin = require("./router/adminRouter")
app.use('/admin',routerAdmin)

// result router
const resultRouter = require("./router/resultRouter")
app.use('/result',resultRouter)

// authentication middleware
const verifyAuthentication = require('./middleWare/authMiddleware')
app.use(verifyAuthentication)

// student class router
const stdClassRouter = require("./router/stdClassRoute")
app.use('/stdClass',stdClassRouter)

// student router
const studentRouter = require("./router/studentRouter")
app.use('/student',studentRouter)

// subject router
const subjectRouter = require("./router/subjectRouter")
app.use('/subject',subjectRouter)

// student subject combination router
const stdSubCombo = require("./router/stdSubComboRouter")
app.use('/combo',stdSubCombo)

// total count router
const totalCountRouter = require('./router/totalCount')
app.use('/totalCount',totalCountRouter)



app.listen(Port,()=>{
    console.log(`this yaaya server is connected to the ${Port}`)
})