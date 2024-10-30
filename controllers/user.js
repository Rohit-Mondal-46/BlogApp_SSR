const User = require('../models/user');

async function handleSingup(req,res) {
    const {name,email,password} = req.body;
     const user = await User.create({
        name,email,password
     })
     if(!user){
        return res.status(400).end('all field are required or email exists')
     }
     return res.status(200).redirect('/users/login')
}


async function handleLogin(req,res) {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).render('login',{error:'email doesn\'t exists'})
     }
     try {
        const isRightPassword = await User.isMatchedAndCreateToken(email,password)
        return res.cookie('token',isRightPassword).redirect('/')
      } catch (error) {
         return res.status(400).render('login',{error:error})
      }
}


module.exports = {
   handleLogin,handleSingup
}