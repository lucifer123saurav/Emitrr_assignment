const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    languagePreference:{
        type:String,
        required:true
    },
    level:{
        type:String,
        enum: ["beginner", "intermediate", "experienced"],
        default:"beginner"
    },
    score:{
        type:Number,
        default:0
    }
})

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 8);
})

/**
 * @param {String} password 
 * @returns {Promise<boolean>}
 */
userSchema.methods.matchPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("users", userSchema);
