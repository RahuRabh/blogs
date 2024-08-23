const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blogs: [
        {
            title: { type: String, require: true},
            content: { type: String, require: true},
        }
    ]
})

const Blog = mongoose.model('Blogs', blogSchema)
module.exports = Blog