const mongoose = require('mongoose')
const {createHmac, randomBytes} = require('node:crypto');
const { createToken } = require('../services/authentication');

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
    },
    role:{
        type:String,
        enum:['ADMIN','NORMAL'],
        default:'NORMAL'
    }

})

//Hashing
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

//For checking whether the password is correct or not
userSchema.statics.isMatchedAndCreateToken = async function(email,password){
    const user = await this.findOne({email});
    // if(!user)
    //     throw new Error('Email not Exists') //handled in 'handlelogin' controller itself

    originalPassword = user.password;
    originalSalt = user.salt
    const providedPasswordHashed = createHmac('sha256',originalSalt).update(password).digest('hex');
    if(originalPassword !== providedPasswordHashed)
        throw new Error("Password not matched")
    const token = createToken(user)
    return token;
}

const User = mongoose.model("blog-users",userSchema);

module.exports = User;