const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nookSchema = new Schema({
    Building: {
        type: String,
        required: true,
        trim: true,
    },
    RoomNumber: {
        type: String,
        required: true,
        trim: true,
    },
    CurrentAvailability: {
        type: String,
        required: true,
        trim: true,
    },
    Schedule: {
        type: String,
        required: true,
        trim: true,
    },
    Major: {
        type: String,
        required: true,
        trim: true,
    },
    DegreeLevel: {
        type: String,
        required: true,
        trim: true,
    },
    AC: {
        type: Boolean,
        required: true,
        trim: true,
    },
    Computer: {
        type: Boolean,
        required: true,
        trim: true,
    },
    Capacity: {
        type: Number,
        required: true,
        trim: true,
    },
})
// should we be splitting this up into bldg and rm#

const Nooks = mongoose.model('study_spaces', nookSchema, 'study_spaces')
const mySchemas = { Nooks: Nooks } // if we want to add more schemas
module.exports = mySchemas
