const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/customError");
const {keys} = require("../config/keys");
const {wrapper} = require("./wrapper")

// checks for auth tokens in request if not found throws particular error
const tokenMiddleware = wrapper(async(req, res, next) => {
    const header = req.headers.authorization;
    const token = header?.split("Bearer ")[1];
    if(!token)
        throw new CustomError("auth tokens missing", 400);
    jwt.verify(token,keys.secret, (err, payload) => {
        if(err) {
            if(err.name="TokenExpiredError")
                throw new CustomError("login to continue", 400)
            throw new CustomError("Invalid token", 400)
        }
        req.user = payload;
        next();
    })
})


module.exports = {tokenMiddleware}