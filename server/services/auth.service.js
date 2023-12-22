const {userService} = require("./")
const {User} = require("../models")
const {CustomError} = require("../utils/customError")
const bcrypt = require("bcrypt");

/**
 * Creates a user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createUser = async(body) => {
    if(await (userService.findUserByEmail(body.email)))
        throw new CustomError("email already exist", 512);
    if(await (userService.findUserByUsername(body.username)))
        throw new CustomError("username already exist", 512);
    return User.create(body);
}

/**
 * login a user
 * @param {Object} body 
 * @returns {Object} 
 */
const getUser = async(body) => {
    const user = await userService.findUserByEmail(body.email);
    if(!user)
        throw new CustomError("user not found!", 512);
    const check = await user.matchPassword(body.password, user.password);
    console.log("check", check)
    if(!check){
        throw new CustomError("Invalid Password", 512);
    }
    return user;
}
module.exports = {createUser, getUser};