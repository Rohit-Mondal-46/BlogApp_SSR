const { getUser } = require("../services/authentication");

function authStatus(cookieName){
    return (req,res,next)=>{
        const cookieTokenValue = req.cookies[cookieName];
        if(!cookieTokenValue)
            return next();
        try {
            const user = getUser(cookieTokenValue);
            req.user = user;
        } catch (error) {}
        next();
    }
} 
module.exports = authStatus