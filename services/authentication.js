const jwt = require('jsonwebtoken')
const secret = '$1$3^5$7#7'


function createToken(user){
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
    const token = jwt.sign(payload,secret);
    return token
}

function getUser(token){
    const user = jwt.verify(token,secret);
    return user;
}

module.exports = {
    createToken,getUser
}