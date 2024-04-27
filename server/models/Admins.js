const mongoose = require('mongoose')

// Creating schema
const UserSchema = new mongoose.Schema({
    // The fields
    fullname: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
    },
    username: {
        type: String
    },
    passwword: {
        type: String,
        required: true
    }
})

// Creating the model
const UserModel = mongoose.model("admins", UserSchema)

// Export the model
module.exports = UserModel;