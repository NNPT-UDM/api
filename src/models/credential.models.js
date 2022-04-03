const { objectId } = require("../utils/common.utils");
const validator = require("validator");
const { BaseModels } = require("../base/models.base");
const { CredentialMiddleware } = require("../middlewares/models/credential.models.middlewares");

const definition = {
  phone: {
    type: String,
    match: /((^(\+\d{2}|\d{2}|0|0084|){1})(3|5|7|8|9))+([0-9]{8})$/,
  },
  username: {
    type: String,
    required: [true, "Please tell us your username!"],
    unique: true,
    sparse: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: [true, "This email is already in use for another account"],
    lowercase: true,
    sparse: true,
    required: [true, "Please tell us your email!"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    // validate: [validator.isStrongPassword, "Please enter a stronger password"],
    select: false,
  },
  password_confirm: {
    type: String,
    required: true,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  password_reset_token: { type: String },
  password_reset_expires: { type: Date },
  password_change_at: { type: Date },
};

class CredentialModel extends BaseModels {
  constructor() {
    super();
    this.name = "Credential";
    this.collection = "credentials";
    this.index = { phone: "text", user: "text", email: "text" };
    this.init({ definition: definition });
    CredentialMiddleware(this.schema);
  }
}
module.exports.CredentialModel = new CredentialModel().export;
