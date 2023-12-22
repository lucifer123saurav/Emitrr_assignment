const {User} = require("../models")

module.exports = {
    findUserByUsername:(username) => {
        return User.findOne({username})
    },

    findUserByEmail:(email) => {
        return User.findOne({email});
    },

    findUserById: (_id) => {
        return User.findOne({_id});
    }

}