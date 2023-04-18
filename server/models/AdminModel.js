const mongoose = require("mongoose")


const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: [true, "username already exist"],
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
},{timestamps: true})


module.exports = mongoose.model('admin', adminSchema)