const express = require("express")
const { registerAdmin, loginAdmin, refreshLoginAdmin, logoutAdmin } = require("../controllers/adminCrude")
const verifyAuthentication = require('../middleWare/authMiddleware')
const router = express.Router()

router.post('/register',registerAdmin)

//login admin crude router
router.post('/login',loginAdmin)

// refresh login admin crude router
router.get('/refresh',refreshLoginAdmin)

// logout admin crude router
router.get('/logout', verifyAuthentication, logoutAdmin)

module.exports = router