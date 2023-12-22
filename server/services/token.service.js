const {keys} = require("../config/keys")
const jwt = require("jsonwebtoken");
const moment = require("moment");

/**
 * creates a jsonwebtoken for user
 * @param {ObjectId} userId 
 * @param {Moment} time 
 * @param {string} type 
 * @returns {string}
 */
const createToken = (userId, time,type) => {
    try {
        const payload = {
            sub:userId,
            iat:moment().unix(),
            exp:time.unix(),
            type
        };
        return jwt.sign(payload,keys.secret)
    } catch (error) {
        throw new Error("Failed to create token");
    }
}

/**
 * generate auth tokens
 * @param {ObjectId} user 
 * @returns {string}
 */
const generateToken = (user) => {
    try {
        const accessTime = moment().add(3, "days");
        const token = createToken(user,accessTime, "access");
        return token;
    } catch (error) {
        throw new Error("failed to create token");
    }
}

module.exports = {createToken, generateToken}