const {wrapper} = require("../utils/wrapper")
const {authService, tokenService} = require("../services")

exports.register = wrapper(async(req, res) => {
    const user = await authService.createUser(req.body);
    // const token = await tokenService.generateToken(user.id);
    return res.json({user, status:"success"});
})

exports.login = wrapper(async(req, res) => {
    const user = await authService.getUser(req.body);
  
    return res.json({user});
})