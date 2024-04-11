const mongoose = require('mongoose')

// Creating schema
const UserSchema = new mongoose.Schema({
    // The fields
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

// Creating the model
const UserModel = mongoose.model("users", UserSchema)

// Export the model
module.exports = UserModel;