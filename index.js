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
require('dotenv').config()

//Variable
const PORT = process.env.PORT || 8000;


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
mongoose.connect(`mongodb+srv://clast98838114:${process.env.MONGO_PASSWORD}@cluster0.ovtxmed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => console.log("Data Base Connected")).catch((e) => console.log("Error in DB connection",e))


//Routes
app.get('/',async (req, res) => {
    const allBlogs = await Blog.find({})
    return res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)


//Listening
app.listen(PORT, console.log(`Server Started:http://localhost:${PORT}`))

//hii