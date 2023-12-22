const router = require("express").Router();
const { Question, User, Results } = require("../models");
const { userService, questionService } = require("../services");
const {tokenMiddleware} = require("../utils/middleware");
const { wrapper } = require("../utils/wrapper");

router.post("/home",tokenMiddleware, wrapper(async(req, res) => {
  const user = await userService.findUserById(req.user.sub);
  res.json({user});
}))

router.post("/profile", tokenMiddleware, wrapper(async(req,res) => {
  const user = await userService.findUserById(req.user.sub);
  return res.json({user});
}))

router.post("/who", tokenMiddleware, wrapper(async(req, res) => {
    const user = await userService.findUserById(req.user.sub);
    return res.json({user});
}))

router.post("/updateLanguage", wrapper(async(req,res) => {
  const user = await userService.findUserByUsername(req.body.username);
  user.languagePreference = req.body.language;
  const previousResults = await questionService.getPreviousResults(req.body.username, req.body.language); // to check if user has already played game with this language
  if(!previousResults){
    user.score = 0; // to restart score for new language. we can still get score for previous langauges from Results model
    user.level = "beginner";
  }
  else{ // if has played then set score and level according to that
    user.score = previousResults.score;
    user.level = previousResults.level;
  }
  await user.save();
  if(previousResults){
    return res.json({message:"language updated", status:"success", previousResults});
  }
  return res.json({message:"language updated", status:"success"});
  
}))

router.post("/resetData", wrapper(async(req,res) => {
  const username = req.body?.username;
  const user = await User.findOne({username});
  user.score = 0;
  user.level = "beginner";
  await user.save();
  await Results.deleteMany({username});
  return res.json({message:"data deleted"});

}))
module.exports = router;
