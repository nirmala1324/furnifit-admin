const mongoose = require('mongoose')

// Creating schema
const TrialSchema = new mongoose.Schema({
    // The fields
    furni_id: {
        type: String,
        required: true
    },
    furni_name: {
        type: String,
        required: true
    },
    space_cat: {
        type: String,
        required: true
    },
    sub_space_cat: {
        type: String,
        required: true
    },
    detail_material: {
        type: String,
        required: true
    },
})

// Creating the model
const TrialModel = mongoose.model("trial", TrialSchema)

// Export the model
module.exports = TrialModel;