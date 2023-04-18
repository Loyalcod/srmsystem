const Subject = require("../models/subjectModel")

exports.createSubjectin = async(req,res)=>{
    if(!(req.body.subjectName || req.body.subjectCode )) return res.status(400).json("data not formatted properly")

    const { subjectName, subjectCode } = req.body

    try {
        const subjectExist = await Subject.find({$or: [{subjectName},{subjectCode}]})
        if(subjectExist.length !== 0) return res.status(409).json({error:"subject name or code already exist"})
        const newSubject = new Subject({
            subjectName,
            subjectCode
        })
        const saveNewSubject = await newSubject.save()
        res.json(saveNewSubject)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllSubject = async(req,res)=>{
    try {
        const allSubject = await Subject.find()
        res.json(allSubject)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getSubject = async(req,res)=>{
    const { subjectId } = req.params

    try {
        const getOneSubject = await Subject.findById(subjectId)
        res.status(200).json(getOneSubject)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.edit_updateSubject = async(req,res)=>{
    const { subjectId } = req.params

    const subjectName = req.body.subjectName == ''? Subject.subjectName : req.body.subjectName
    const subjectCode = req.body.subjectCode == ''? Subject.subjectCode : req.body.subjectCode

    try {
        const updateSubject = await Subject.updateOne(
            {_id: subjectId},
            {$set: {
                subjectName,
                subjectCode
            }}
        )
        res.json(updateSubject)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delSubject = async(req,res)=>{
    const {subjectId} = req.body

    try {
        const deleteSubject = await Subject.deleteOne(subjectId)
        res.json(deleteSubject)

    } catch (error) {
        res.json({error:error.message})
    }
}