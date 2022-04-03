const { objectId } = require("../utils/common.utils");
const jwt = require("jsonwebtoken");
const { KEY_SECRET_JWT } = require("../configs/app.configs");
class QuizMiddlewares {
  createUpdate(req, res, next) {
    const method = req.method;
    switch (method) {
      case "POST":
        break;
      case "PUT":
        break;
      default:
        break;
    }
  }

  startQuiz(req, res, next) {
    const { quiz_sess } = req.session;
    if (quiz_sess) {
      let { times, id } = jwt.verify(token, KEY_SECRET_JWT);
      if (times > 2)
        return res.status(401).json({
          success: 0,
          message: "You have reached your test execution limit.",
        });
      times += 1;
      const payload = {
        id: id,
        times: times,
      };
      let token = jwt.sign(payload, KEY_SECRET_JWT, {
        expiresIn: quiz?.duration || "2m",
      });
      req.session.quiz_sess = token;
      return next();
    }
    return res.status(401).json({
      success: 0,
      message: "The quiz belonging to this token does no longer exist.",
    });
  }

  initAnswer(req, res, next) {
    next();
  }

  correctAnswer(req, res, next) {}

  endQuiz(req, res, next) {}
}

module.exports.QuizMiddlewares = new QuizMiddlewares();
