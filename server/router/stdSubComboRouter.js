const express = require("express")
const { createCombo, getAllStudentSubjectCombo, toggleStatus, delCombo } = require("../controllers/stdSubComboCrude")
const router = express.Router()


router.post('/',createCombo)

// get all student subject combination router
router.get('/',getAllStudentSubjectCombo)

// toggle status for student and subject combination router
router.get('/:comboId',toggleStatus)

// delete student subject combination router
router.delete('/:combId/:studentId/:subjectId', delCombo)




module.exports = router