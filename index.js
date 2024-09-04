//Importing
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authStatus = require('./middleware/authentication')
const Blog = require('./models/blog')


//Variable
const PORT = 8000;


//Instance
const app = express()


//Middleware
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(authStatus('token'))
app.use(express.static(path.resolve('./public')))


//DB connection
mongoose.connect('mongodb://localhost:27017/BlogApp').then(() => console.log("Data Base Connected")).catch(() => console.log("Error in DB connection"))


//Routes
app.get('/',async (req, res) => {
    const allBlogs = await Blog.find({})
    // console.log(allBlogs)
    return res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})
app.use('/users', userRouter)
app.use('/blogs', blogRouter)


//Listening
app.listen(PORT, console.log(`Server Started at PORT:${PORT}`))