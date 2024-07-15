//Importing
const express = require('express')
const ejs = require('ejs')
const path = require('path')

//Variable
const PORT = 8000;

//Instance
const app = express()


//Middleware
app.set('view engine','ejs')
app.set('veiws',path.resolve('./views'))

//DB connection




//Routes
app.get('/',(req,res)=>{
    return res.render('home')
})



//Listening
app.listen(PORT,console.log(`Server Started at PORT:${PORT}`))