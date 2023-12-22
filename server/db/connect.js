const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://lucifer123saurav:Saurav%4009876@cluster0.kpbas97.mongodb.net/?retryWrites=true&w=majority/")
}

module.exports = {connect}