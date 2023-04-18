const express = require("express")
const { countTotal } = require("../controllers/totalcount")
const router = express.Router()


router.get('/',countTotal)



module.exports = router