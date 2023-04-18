const mongoose = require("mongoose")


const stdSchema = mongoose.Schema({
    stdName:{
        type: String,
        required: true
    },
    regNo: {
        type: Number,
        required: true,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        dropDups: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others" ]
    },
    dob: {
        type: String,
        required: true,
    },

    stdClass: {type: mongoose.Types.ObjectId, ref: 'stdClass'},
    subjectId: [{type: mongoose.Types.ObjectId, ref: 'subject'}],
    resultId: [{type: mongoose.Types.ObjectId, ref: 'result'}]
},{timestamps: true})

const student = mongoose.model('student',stdSchema)
module.exports = student