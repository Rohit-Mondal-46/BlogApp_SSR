const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog')
const Comment = require('../models/comment')


//Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/blogPhotos'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
      // console.log(file);
    }
  })
  
  const upload = multer({ storage: storage })


const router = Router()
router.get('/add',(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })
})

router.post('/add',upload.single('post-image'),async (req,res)=>{
    const {title,content} = req.body;
    // console.log(req.user);
    const blog = await Blog.create({
        title,content,author:req.user.id,image:`blogPhotos/${req.file.filename}`,
    })
    if(!blog)
        return res.end('all fields are required');
    return res.redirect('/')
})


router.get('/',async (req,res)=>{
  const blog = await Blog.find()
  if(!blog){
    return res.status(404).end("404 Not Found")
  }
  return res.status(200).json(blog);
})


router.get('/:id',async (req,res)=>{
  const id = req.params.id
  const comments = await Comment.find({blogId:id})
  const blog = await Blog.find({_id:id})
  if(!blog){
    return res.status(404).end("404 Not Found")
  }
  // console.log('new',blog[0]._id);
  return res.render('singleBlog',{
    blog:blog[0],
    comments:comments,
    user: req.user
  })
  // return res.json({blog,comments})
})


router.get('/my/:id',async (req,res)=>{
  const id = req.params.id
  // console.log(id);
  const myBlog = await Blog.find({author:id})
  // console.log(myBlog);
  if(!myBlog){
    return res.status(404).end("404 Not Found")
  }
  return res.render('individualBlogs',{
    blog:myBlog,
    user: req.user
  })
  // return res.json(myBlog)
})


router.post('/comment/:id',async (req,res)=>{
  const {content} = req.body;
  try {
    await Comment.create({
      content,
      blogId:req.params.id,
      author:req.user.id
    })
    return res.redirect(`/api/blogs/${req.params.id}`)
  } catch (error) {
    return res.send({error:error.message})
    // return res.render('singleBlog',{blog: myBlog,user:req.user,error:error.message})
  }
})

module.exports = router;