const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    userType: {
        type: String,
        enum: ['patient', 'Pharmacist'],
        required: true
    },
    accountStatus: {
        type: String,
        enum: ['active', 'inactive']
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)