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
        type: String
    }],
    WeekendTime: [{
        type: String
    }]
});

const userSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    SpaceList: [{
        type: String
    }]
});

const ratingSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    RoomID: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    }
});

const Nooks = mongoose.model('study_dev', nookSchema, 'study_dev')
const Ratings = mongoose.model('ratings_spaces', ratingSchema, 'ratings_spaces')
const Users = mongoose.model('oauth_users', userSchema, 'oauth_users')

const mySchemas = { Nooks: Nooks, Ratings: Ratings, Users: Users } // if we want to add more schemas
module.exports = mySchemas
