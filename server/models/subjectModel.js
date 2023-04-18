const mongoose = require("mongoose")


const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },

    studentId: [{type: mongoose.Types.ObjectId, ref: 'student'}],
    resultId: [{type: mongoose.Types.ObjectId, ref: 'result'}]
},{timestamps: true})

module.exports = mongoose.model('subject',subjectSchema)