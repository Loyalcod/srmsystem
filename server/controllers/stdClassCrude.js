const stdClass = require("../models/stdClassModel")


exports.createStdClass = async(req,res)=>{
    if(!(req.body.className || req.body.section)) return res.status(400).json("data not formatted properly")

    const { className, section } = req.body

    try {
        const stdClassExist = await stdClass.exists({className})
        if(stdClassExist) return res.status(409).json("class name already exist")
        const createStudentClass = await stdClass.create({
            className,
            section
        })
        res.status(200).json(createStudentClass)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getAllClasses = async(req,res)=>{
    try {
        const getAll = await stdClass.find()
        res.json(getAll)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneClass = async(req,res)=>{
    const { classId } = req.params

    try {
        const getOne = await stdClass.findById(classId)
        res.json(getOne)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateOneClass = async(req,res)=>{
    const { classId } = req.params

    const className = req.body.className == '' ? stdClass.className : req.body.className
    const section = req.body.section == '' ? stdClass.section : req.body.section

    try {
        const updateClass = await stdClass.updateOne(
            {_id: classId},
            {$set: {className, section}}
        )
        res.json(updateClass)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteOneClass = async(req,res)=>{
    const { classId } = req.params

    try {
        const delOneClass = await stdClass.deleteOne({_id: classId})
        res.json(delOneClass)

    } catch (error) {
        res.json({error:error.message})
    }
}

