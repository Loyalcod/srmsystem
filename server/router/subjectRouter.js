const express = require("express")
const { createSubjectin, getAllSubject, getSubject, edit_updateSubject, delSubject } = require("../controllers/subjectCrude")
const router = express.Router()




router.post('/',createSubjectin)

router.get('/',getAllSubject)

router.get('/:subjectId',getSubject)

router.patch('/:subjectId',edit_updateSubject)

router.delete('/:subjectId',delSubject)


module.exports = router