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
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog-users",
    },
})

const Blog = mongoose.model("blogs",schema);

module.exports = Blog;