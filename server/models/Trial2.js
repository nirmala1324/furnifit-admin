const mongoose = require('mongoose')

// Creating schema
const Trial2Schema = new mongoose.Schema({
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
    furni_desc: {
        type: String,
        required: true
    },
    furni_dimension: {
        type: [String],
        default: []
    },
    furni_picture: {
        type: String,
        required: true
    },
    furni_type: {
        type: String,
        required: true
    },
    furni_style: {
        type: String,
        required: true
    },
    material_tag: {
        type: [String],
        default: []
    },
    vectary_link: {
        type: String,
        required: true
    },
})

// Creating the model
const Trial2Model = mongoose.model("trial2", Trial2Schema)

// Export the model
module.exports = Trial2Model;