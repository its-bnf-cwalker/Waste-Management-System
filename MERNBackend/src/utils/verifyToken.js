const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser")
const {createError} = require("../utils/error.js")

module.exports.verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, `${process.env.JWT}`, (err, useremail)=>{
        if(err) return next(createError(403, "Token is not valid"));
        req.useremail = useremail;
        next()
    });
}

module.exports.verifyUser = (req, res, next)=>{
    this.verifyToken(req, res, next, ()=>{
        if(req.useremail.id === req.params.id || req.useremail.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized"));
        }
    })
}

module.exports.verifyAdmin = (req, res, next)=>{
    this.verifyToken(req, res, next, () => {
        if(req.useremail.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized"));
        }
    })
}