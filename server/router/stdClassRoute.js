const express = require("express")
const { createStdClass, getAllClasses, getOneClass, updateOneClass, deleteOneClass } = require("../controllers/stdClassCrude")
const router = express.Router()


// create student class router
router.post('/createClass', createStdClass)

// get all student class  router
router.get('/getall',getAllClasses)

// get individual class router
router.get('/:classId',getOneClass)

// update individual class router
router.patch('/:classId',updateOneClass)

// delete one class router
router.delete('/:classId',deleteOneClass)


module.exports = router