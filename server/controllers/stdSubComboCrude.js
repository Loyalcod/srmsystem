const stdSubCombo = require("../models/stdSubComboModel")
const Student = require("../models/sdtModel")
const Subject = require("../models/subjectModel")


exports.createCombo = async(req,res)=>{

    if(!(req.body.studentId || req.body.subjectId)) return res.status(400).json("data not formatted properly")

    const { studentId, subjectId } = req.body

    try {
        const checkStudent_SubjectExist = await Student.findById(studentId)
        if(checkStudent_SubjectExist.subjectId.includes(subjectId)){
            return res.status(409).json({error: "combination exist"})
        }

        const storeSubjectIdInStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            {$push: {subjectId}}
        )
        const storeStudentIdInSubject = await Subject.findOneAndUpdate(
            {_id: subjectId},
            {$push: {studentId}}
        )

        const saveToStdSubCombo = await stdSubCombo.create({
            studentId,
            subjectId
        })

        res.status(200).json(saveToStdSubCombo)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllStudentSubjectCombo = async(req,res)=>{
    try {
        const getStudentSubjectCombo = await stdSubCombo.find()
        .populate({
            path: 'studentId',
            populate: {
                path: 'stdClass' 
            }
        }).populate('subjectId')

        res.status(200).json(getStudentSubjectCombo)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.toggleStatus = async(req,res)=>{
    const { comboId } = req.params

    try {
        const getStatusForToggle = await stdSubCombo.findById(comboId).select('status')
        var realStatus = getStatusForToggle.status
        realStatus === true ? realStatus = false : realStatus = true

        const updateStatus = await stdSubCombo.updateOne(
            {_id: comboId},
            {$set: {status: realStatus}}
        )

        res.json(updateStatus)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delCombo = async(req,res)=>{
    const { comboId, studentId, subjectId } = req.params

    try {
        const removesubjectIdFromStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            {$pull: {subjectId}}
        )

        const removeStudentIdFromsubject = await Subject.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {studentId}}
        )

        const deleteCombo = await stdSubCombo.deleteOne(comboId)
        res.json(deleteCombo)

    } catch (error) {
        res.json({error:error.message})
    }
}