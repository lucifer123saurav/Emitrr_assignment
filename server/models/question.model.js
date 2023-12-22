const mongoose = require("mongoose");

const qSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        requied:true
    },
    score:{
        type:Number,
        min:1,
        max:5
    },
    options:{
        type:[String],
        requied:true
    },
    details:{   // contains rightOption, level and language
        type:[String],
        required:true
    }
})


module.exports = mongoose.model("question", qSchema);