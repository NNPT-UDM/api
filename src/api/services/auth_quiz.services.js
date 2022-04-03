const {
  KEY_SECRET_JWT,
  JWT_EXPIRE_IN,
  JWT_COOKIE_EXPIRE_IN,
  NODE_ENV,
} = require("../../configs/app.configs");
const jwt = require("jsonwebtoken");
const { QuizCredentialModel } = require("../../models/quiz_credential.models");
const { Email } = require("../../utils/email.utils");

class AuthQuizService {
  async register(request, response) {
    try {
      const body = request.body;
      const { quiz, phone, email } = body;
      let fields = [{ phone: phone }, { email: email }];
      fields = fields.filter((field) => {
        if (Object.values(field)[0] !== undefined) return field;
      });
      const credential = await QuizCredentialModel.findOne({
        quiz: quiz,
        $or: fields,
      }).populate("quiz");
      if (credential) {
        return await this.jwtSign({
          req: request,
          quiz: credential.quiz,
          message: "This info has already been registered for this test",
        });
      }
      try {
        let credential = await QuizCredentialModel.create(body);
        credential = await credential.populate("quiz");
        return await this.jwtSign({
          req: request,
          quiz: credential.quiz,
          message: "Trainee registered successfully!",
        });
      } catch (error) {
        console.log(error);
        return {
          success: 0,
          message: "Registration failed",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: 0,
        message: "Registration for this test has been closed!",
      };
    }
  }

  async jwtSign({ req, quiz, message } = {}) {
    const payload = {
      id: quiz?._id,
      times: 0,
    };
    let token = jwt.sign(payload, KEY_SECRET_JWT, {
      expiresIn: quiz?.duration || "2m",
    });
    req.session.quiz_sess = token;
    return {
      message: message,
      token: token,
    };
  }
}

module.exports.AuthQuizService = new AuthQuizService();
