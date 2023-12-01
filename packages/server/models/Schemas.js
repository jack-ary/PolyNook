const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nookSchema = new Schema({
    Building: {
        type: String,
        required: true
    },
    RoomNumber: {
        type: Schema.Types.Mixed,
        required: true
    },
    CurrentAvailability: {
        type: String,
        default: ''
    },
    Schedule: {
        type: String,
        required: true
    },
    Major: {
        type: String
    },
    Degree: {
        type: String,
        required: true
    },
    AC: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    Computer: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    Capacity: {
        type: Number,
        required: true
    },
    Rating: {
        type: String,
        default: ''
    },
    RatingPop: {
        type: Number
    },
    Registration: {
        type: String
    },
    WeekdayTime: [{
        type: String // Array of strs
    }],
    WeekendTime: [{
        type: String
    }]
});

const Nooks = mongoose.model('study_spaces', nookSchema, 'study_spaces')
const mySchemas = { Nooks: Nooks } // if we want to add more schemas
module.exports = mySchemas
