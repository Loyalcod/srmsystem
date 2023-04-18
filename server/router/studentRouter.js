const express = require("express")
const { studentSave, getAllStudent, getStudent, editUpdateStudent, delStudent } = require("../controllers/studentCrude")
const router = express.Router()



router.post('/',studentSave)

router.get('/',getAllStudent)

router.get('/:studentId', getStudent)

router.patch('/:studentId',editUpdateStudent)

router.delete('/:studentId/:classId', delStudent)



module.exports = router