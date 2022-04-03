const { sendSuccess, sendError } = require("../../base/router.base");
const { AuthQuizService } = require("../services/auth_quiz.services");

class AuthController {
  async register(req, res, next) {
    try {
      const data = await AuthQuizService.register(req, res);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports = new AuthController();
