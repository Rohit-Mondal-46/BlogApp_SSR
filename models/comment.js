const mongoose = require('mongoose')

const schema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogs",
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
})

const Comment = mongoose.model("comments",schema);

module.exports = Comment;