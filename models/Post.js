const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: false},
    views: {type: Number, required: true},
    categories: {type: Array, required: false}
}, {
    timestamps: true,
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;