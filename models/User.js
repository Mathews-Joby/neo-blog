const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    banner: {type: String, required: false},
    followers: {type: Array, required: true},
    following: {type: Array, required: true},
    posts: {type: Array, required: true},
    name: {type: String, required: false},
    about: {type: String, required: false},
    age: {type: Number, required: false},
    birthday: {type: Date, required: false},
    country: {type: String, required: false},
    reddit: {type: String, required: false},
    facebook: {type: String, required: false},
    instagram: {type: String, required: false},
    github: {type: String, required: false},
    spotify: {type: String, required: false},
    spotifyLink: {type: String, required: false},
    facebookLink: {type: String, required: false},
    profilePic: {type: String, default: ""}
}, {
    timestamps: true,
});



const User = mongoose.model('User', UserSchema);
module.exports = User;