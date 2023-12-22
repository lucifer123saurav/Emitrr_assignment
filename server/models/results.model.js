const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model("results", resultsSchema);