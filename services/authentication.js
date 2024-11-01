const jwt = require('jsonwebtoken')
require('dotenv').config()


function createToken(user){
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET);
    return token
}

function getUser(token){
    const user = jwt.verify(token,process.env.JWT_SECRET);
    return user;
}

module.exports = {
    createToken,getUser
}