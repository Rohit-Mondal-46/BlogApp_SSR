// const Blog = require('../models/blog')

// async function handleBlogAdd(req,res){
//     const {title,content,image} = req.body;
//     const blog = await Blog.create({
//         title,content,createdBy:req.user._id,image:`public/blogPhotos/${req.file.filename}`,
//     })
//     if(!blog)
//         return res.end('all fields are required');
//     return res.redirect('/')
// }

// module.exports = handleBlogAdd;