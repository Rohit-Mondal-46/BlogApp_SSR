const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
})

const Blog = mongoose.model("blogs",schema);

module.exports = Blog;