const { Question,Results } = require("../models");
const { CustomError } = require("../utils/customError");
const { qType } = require("../config/keys")
module.exports = {

    addQuestion: (data) => {
        try {
            const { question, option1, option2, score, level, language, rightOption, ...rest } = data;
            let options = [];
            let details = [];
            details.push(qType[level], language, rightOption)
            options.push(option1, option2)
            for (let key in rest) {         // adding rest of the optional options in the array
                if (rest.hasOwnProperty(key)) {
                    options.push(rest[key]);
                }
            }
            return Question.create({ title: question, score, options, details });
        } catch (error) {
            throw new CustomError(error.message, 512);
        }
    },

    getQuestions: async (language, Qlevel) => {
        const level = qType[Qlevel];
        try {
            const questions = await Question.find({
                'details.1': language,
                'details.0': level
            }).sort({score:1});
            return questions;
        } catch (error) {
            throw new CustomError(error.message, 512);
        }
    },

    getPreviousResults:async(username,language) =>{
        return Results.findOne({username, language}).sort({score:-1}); // sort with the highest score ever achieved
    }
}