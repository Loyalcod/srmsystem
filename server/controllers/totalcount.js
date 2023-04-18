const Student = require('../models/sdtModel')
const Subject = require("../models/subjectModel")
const Result = require('../models/resultModel')
const StudentClass = require("../models/stdClassModel")


exports.countTotal = async(req,res)=>{
    try {
        const TotalStudent = await Student.count()
        const totalSubject = await Subject.count()
        const totalResult = await Result.count()
        const totalStudentClass = await StudentClass.count()

        res.json({
            TotalStudent,
            totalSubject,
            totalResult,
            totalStudentClass
        })

    } catch (error) {
        res.json({error:error.message})
    }
}