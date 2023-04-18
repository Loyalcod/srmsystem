const Result = require("../models/resultModel")
const Student = require("../models/sdtModel")
const Subject = require("../models/subjectModel")


exports.createResultSave = async(req,res)=>{
    const { studentId, subjectId, classId, mark } = req.body

    try {
        const resultExist = await Result.exists({studentId, subjectId, classId})
        if(resultExist) return res.status(409).json("result have been decleared already")

        const saveResult = await Result.create({
            studentId,
            subjectId,
            classId,
            mark
        })

        const updateResultIdInStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            {$push: {resultId: saveResult._id}}
        )
        const updateResultIdInSubject = await Subject.findOneAndUpdate(
            {_id: subjectId},
            {$push: {resultId: saveResult._id}}
        )

        res.json(saveResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.checkResult = async(req,res)=>{
    const { email, regNo } = req.params 

    try {
        const studentResultExist = await Student.exists({email, regNo})
        if(!studentResultExist) return res.status(409).json("student result doesn't exist")

        const studentResult = await Student.find({email, regNo})
        .populate('stdClass').populate({
            path: 'resultId',
            populate: {
                path: 'subjectId'
            }
        })

        res.json(studentResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneResult = async(req,res)=>{
    const { resultId } = req.params
    
    try {
        const oneResult = await Result.findById(resultId)
        .populate('studentId').populate('subjectId')
        res.json(oneResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllResult = async(req,res)=>{
    try {
        const resultAll = await Result.find()
        .populate('studentId').populate('subjectId')
        res.json(resultAll)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateResult = async(req,res)=>{
    const { resultId } = req.params

    const mark = req.body.mark == ''? Result.mark : req.body.mark

    try {
        const updateResult = await Result.updateOne(
            {_id: resultId},
            {$set: {mark}}
        )

        res.json(updateResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteResult = async(req,res)=>{
    const { resultId, studentId, subjectId } = req.params

    try {
        const removeResultIdFromStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            {$pull: {resultId}}
        )
        const removeResultIdFromSubject = await Subject.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {resultId}}
        )

        const delResult = await Result.deleteOne({_id: resultId})
        res.json(delResult)
        
    } catch (error) {
        
    }
}
