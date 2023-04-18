const express = require("express")
const { createResultSave, checkResult, getOneResult, getAllResult, updateResult, deleteResult } = require("../controllers/resultCrude")
const verifyAuthentication = require('../middleWare/authMiddleware')
const router = express.Router()



router.post('/', verifyAuthentication, createResultSave)

router.get('/:email/:regNo',checkResult)

router.get('/:resultId', verifyAuthentication, getOneResult)

router.get('/', verifyAuthentication, getAllResult)

router.patch('/:resultId', verifyAuthentication, updateResult)

router.delete('/:resultId/:studentId/:subjectId', verifyAuthentication, deleteResult)


module.exports = router