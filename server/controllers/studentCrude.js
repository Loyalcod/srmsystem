const Student = require("../models/sdtModel")
const studentClass = require("../models/stdClassModel")

exports.studentSave = async(req,res)=>{
    if(!(req.body.stdName || req.body.regNo || req.body.email || req.body.gender || req.body.dob || req.body.stdClass)) return res.status(400).json("data not formatted properly")

    const  { stdName, regNo, email, gender, dob, stdClass } = req.body

    try {
        const regNoExist = await Student.exists({regNo})
        if(regNoExist) return res.status(409).json("registration Number already exist")
        const emailExist = await Student.exists({email})
        if(emailExist) return res.status(409).json("email address already exist")
        const saveInStudent = await Student.create({
            stdName,
            regNo,
            email,
            gender,
            dob,
            stdClass
        })

        const updateStudentClass = await studentClass.findById(stdClass)
        updateStudentClass.students.push(saveInStudent._id)
        const updatedStudentClass = await updateStudentClass.save()

        res.json(saveInStudent)


    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllStudent = async(req,res)=>{
    try {
        const allStudent = await Student.find().populate('stdClass')
        res.json(allStudent)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getStudent = async(req,res)=>{
    const { studentId } = req.params

    try {
        const getOneStudent = await Student.findById(studentId)
        res.json(getOneStudent)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.editUpdateStudent = async(req,res)=>{
    const {studentId} = req.params
    const  { stdName, regNo, email, gender, dob, stdClass } = req.body

    try {
        const getStudentClass = await Student.findById({_id: studentId})
        if(getStudentClass.stdClass !== stdClass){

            const removeStudentIdFromClass = await studentClass.findOneAndUpdate(
                {students : studentId},
                {$pull: {students: studentId}}
            )
            const pushStudentIdInClass = await studentClass.findOneAndUpdate(
                {_id: stdClass},
                {$push: {students: studentId}}
            )
        }
        const updateStudent = await Student.updateOne(
            {_id: studentId},
            {$set: {
                stdName,
                regNo,
                email,
                gender,
                dob,
                stdClass 
            }}
        )

        res.json(updateStudent)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delStudent = async(req,res)=>{
    const { studentId } = req.params
    const { classId } = req.params

    try {
        const removeStudentIdFromStudentClass = await studentClass.findOneAndUpdate(
            {_id: classId},
            {$pull: {students: studentId}}
        )
        const deleteStudent = await Student.deleteOne({_id: studentId})
        res.json(deleteStudent)
        
    } catch (error) {
        res.json({error:error.message})
    }
}