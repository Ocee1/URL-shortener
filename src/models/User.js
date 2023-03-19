const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema ({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    refreshToken: {
        type: String
    }
})

module.exports = model('User', userSchema);