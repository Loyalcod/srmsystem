const mongoose = require("mongoose")


const studentSubjectComboSchema = mongoose.Schema({
    studentId: {type: mongoose.Types.ObjectId, ref: 'student'},
    subjectId: {type: mongoose.Types.ObjectId, ref: 'subject'},
    status: {
        type: Boolean,
        default: 1
    }
},{timestamps: true})

module.exports = mongoose.model('combo',studentSubjectComboSchema)