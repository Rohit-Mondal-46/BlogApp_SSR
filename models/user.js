const mongoose = require('mongoose')
const {createHmac, randomBytes} = require('node:crypto');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
        required:true,
    },

})

userSchema.pre('save',function (next){
    const user = this;
    if(!user.isModified('password'))
        return;
    const salt = randomBytes(8).toString();
    const hashedPass = createHmac('sha256',salt).update(user.password).digest('hex');
    
    user.salt = salt;
    user.password = hashedPass;
    next();
})

const User = mongoose.model("users",userSchema);

module.exports = User;