const { objectId } = require("../utils/common.utils");
const validator = require("validator");
const { BaseModels } = require("../base/models.base");

const definition = {
  quiz: { type: objectId, ref: "Quiz", required: [true, "Miss Quiz ID"] },
  display_name: { type: String, required: [true, "Please tell us your name"] },
  phone: {
    type: String,
    match: /((^(\+\d{2}|\d{2}|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
    required: [true, "Please tell us your phone number!"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Please tell us your email!"],
  },
  status: { type: Boolean, default: true },
};

class QuizCredentialModel extends BaseModels {
  constructor() {
    super();
    this.name = "QuizCredential";
    this.collection = "quiz_credentials";
    this.index = { phone: "text", display_name: "text", email: "text" };
    this.init({ definition: definition });
  }
}
module.exports.QuizCredentialModel = new QuizCredentialModel().export;
