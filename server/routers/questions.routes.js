const { User, Results } = require("../models");
const { questionService } = require("../services");
const { CustomError } = require("../utils/customError");
const { tokenMiddleware } = require("../utils/middleware");
const { wrapper } = require("../utils/wrapper");

const router = require("express").Router();

router.post("/add", tokenMiddleware, async (req, res) => {
  try {
    const question = await questionService.addQuestion(req.body);
    return res.json({ question });
  } catch (error) {
    throw new CustomError("failed to add question!", 500);
  }
});

router.post("/:language/:level", async (req, res) => {
  try {
    const questions = await questionService.getQuestions(req.params.language, req.params.level);
    return res.json({ questions });
  } catch (error) {
    throw new CustomError("failed to fetch questions", 512);
  }
});

router.post("/score", wrapper(async (req, res) => {
  const username = req.body.user;
  const score = req.body.score;
  const level = req.body.level;
  const language = req.body.language;

  const user = await User.findOne({ username });

  // Update user's level and score
  if (level === 'intermediate' && score > 10) {
    user.level = "experienced";
  } else if (level === 'experienced' && score > 20) {
    // user.level = "experienced"; // no need to do it coz user already won the game
  }
  user.score = score;

  // Save user data
  await user.save();

  // Find or create a Results document
  const existingResult = await Results.findOne({ username, language, level });
  if (existingResult) {
    existingResult.score = score;
    await existingResult.save();
  } else {
    await Results.create({ username, score, language, level });
  }

  // Get the top results for the language and level
  const results = await Results.find({ language, level }).sort({ score: -1 });

  return res.json({ status: "success", results });
}));

router.post("/nextQuestion", wrapper(async (req, res) => {
  const { questions, currentQuestion, currentAnswer } = req.body;
  // making sure not to send already answered question
  let remainingQuestions = questions.filter(question => question._id !== currentQuestion._id);

  // Check the user's performance
  const rightAnswer = currentQuestion.details[2];
  const userIsPerformingWell = currentAnswer === rightAnswer;
  if (userIsPerformingWell) {
    // If the user is performing well, send a harder question
    remainingQuestions = findHarderQuestion(remainingQuestions);
  } else {
    // If the user is not performing well, send an easier question
    remainingQuestions = findEasierQuestion(remainingQuestions);
  }
  res.json({ questions: remainingQuestions, correctOrNot: userIsPerformingWell }); // sending remainingQuestions to reduce computation to traverse entire questions again
}));

function findEasierQuestion(questions) {
  questions.sort((a, b) => a.score - b.score);
  return questions;
}

function findHarderQuestion(questions) {
  questions.sort((a, b) => b.score - a.score);
  return questions;
}

module.exports = router;